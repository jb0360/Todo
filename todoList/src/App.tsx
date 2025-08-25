import { useEffect, useState, useOptimistic } from 'react'
import './App.css'
import AddTask from './component/AddTask'
import Card from './component/Card'
import DeleteTask from './component/DeleteTask'
import type { Task } from './data/data'

type TaskAction =
  | { type: "add"; task: Task }
  | { type: "edit"; task: Task }
  | { type: "delete"; id: number };

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [taskFlag, setTaskFlag] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(10);
  let limit = 7;

  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/tasks?page=${page}&limit=${limit}`);
      const data = await response.json();
      // console.log("response: ", data);

      setTasks(data.todoData);
      setMaxPages(data.totalPages)
    } catch (error) {
      console.error(error);
    }
  }

  const capitalize = (str: string): any => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const addTaskPopup = () => {
    setTaskFlag('Add');
    setIsAddTaskOpen(prev => !prev);
  }

  const editTaskPopup = (data: Task | null) => {
    setTaskFlag('Edit');
    setEditingTask(data);
    setIsEditTaskOpen(prev => !prev);
  }

  const deleteTaskPopup = (dltId: Task['_id']) => {
    setDeleteTaskId(dltId);
    setIsDeleteTaskOpen(prev => !prev);
  }

  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (currentTasks, action: TaskAction) => {
      switch (action.type) {
        case "add":
          return [{ ...action.task }, ...currentTasks];
        case "edit":
          return currentTasks.map((t) =>
            t._id === action.task._id ? { ...t, ...action.task } : t
          );
        case "delete":
          return currentTasks.filter((t) => t._id !== action.id);
        default:
          return currentTasks;
      }
    }
  );
  // console.log("Op: ", optimisticTasks);

  const addNewTask = async (taskName: string, priority: Task['priority']) => {
    const newTask: Task = {
      _id: Date.now(),
      taskTitle: capitalize(taskName.trim()),
      priority,
      progress: 'To Do'
    };

    updateOptimisticTasks({
      type: "add",
      task: newTask
    });
    setIsAddTaskOpen(false);
    setTasks(prev =>
      [newTask, ...prev.filter(task => task._id !== newTask._id)]
    );
    alert('New Task Is Added To 1st Page!');

    try {
      setTimeout(async () => {
        const response = await fetch('http://localhost:8080/api/v1/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        });

        if (!response.ok) {
          throw new Error("Failed to add");
        }

        const addResult = await response.json();
        console.log(addResult);
      }, 1000);
    } catch (error) {
      setTasks(prev => prev.filter(task => task._id !== newTask._id));
      console.log("error:", error);
    }
  }

  const editTask = async (id: number | undefined, taskName: string, priority: Task['priority'], progress: Task['progress']) => {
    // console.log(id, taskName, priority, progress);
    if (id) {
      updateOptimisticTasks({
        type: "edit",
        task: {
          _id: id,
          taskTitle: capitalize(taskName.trim()),
          priority: priority,
          progress: progress,
        },
      });
      setIsEditTaskOpen(false);
      setTasks(prev =>
        [{
          _id: id,
          taskTitle: capitalize(taskName.trim()),
          priority: priority,
          progress: progress,
        }, ...prev.filter(task => task._id !== id)]
      );

      try {
        setTimeout(async () => {
          const response = await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              taskTitle: taskName ? capitalize(taskName.trim()) : null,
              priority: priority ? priority : null,
              progress: progress ? progress : null
            })
          });

          if (!response.ok) {
            throw new Error("Failed to edit");
          }

          const editResult = await response.json();
          console.log(editResult);
        }, 1000);
      } catch (error) {
        setTasks(prev => prev.filter(task => task._id !== id));
        console.log("error:", error);
      }

      // fetchTodos();
    }
  }

  const deleteTask = async (dlt: Boolean) => {
    if (dlt && deleteTaskId) {
      updateOptimisticTasks({
        type: "delete",
        id: deleteTaskId,
      });
      setTasks(prev => prev.filter(task => task._id !== deleteTaskId));
      setIsDeleteTaskOpen(false);

      try {
        setTimeout(async () => {
          const response = await fetch(`http://localhost:8080/api/v1/tasks/${deleteTaskId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete");
          }

          const deleteResult = await response.json();
          console.log(deleteResult);
        }, 1000)
      } catch (error) {
        setTasks(prev => prev.filter(task => task._id !== deleteTaskId));
        console.error("delete error:", error);
      }
      // fetchTodos();
    }
  }

  const handlePages = (val: string) => {
    // console.log("page: ",val);
    val === 'next' ? setPage(page + 1) : setPage(page - 1);
  }

  useEffect(() => {
    fetchTodos();
  }, [page]);

  return (
    <div className='container'>
      <div className={isAddTaskOpen || isEditTaskOpen || isDeleteTaskOpen ? 'tasklist blurred' : 'tasklist'}>
        <header className='header'>
          <div className='logo'>Task List</div>
          <button className='addtask' onClick={addTaskPopup}>Add Task</button>
        </header>
        <div className='card-list'>
          {
            optimisticTasks.length > 0 ?
              optimisticTasks.map((data: Task) => {
                return <Card key={data?._id} data={data} editTaskPopup={editTaskPopup} editTask={editTask} deleteTaskPopup={deleteTaskPopup} />
              })
              : <p className='no-task'>No Task Found</p>
          }
        </div>
        <div className="pages">
          {page !== 1 && <button className="prev" onClick={() => handlePages('prev')}>Prev</button>}
          <div className="pageValue">Page: {page}</div>
          {page !== maxPages && <button className="next" onClick={() => handlePages('next')}>Next</button>}
        </div>
      </div>
      {(isAddTaskOpen || isEditTaskOpen) && (
        <div className="popup-show">
          <AddTask taskFlag={taskFlag} addTaskPopup={addTaskPopup} addNewTask={addNewTask}
            editingTask={editingTask} editTaskPopup={editTaskPopup} editTask={editTask} />
        </div>
      )}
      {isDeleteTaskOpen && (
        <div className="popup-show">
          <DeleteTask deleteTask={deleteTask} />
        </div>
      )}
    </div>
  )
}

export default App
