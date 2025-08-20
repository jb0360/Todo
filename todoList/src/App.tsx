import { useEffect, useState } from 'react'
import './App.css'
import AddTask from './component/AddTask'
import Card from './component/Card'
import DeleteTask from './component/DeleteTask'
import type { Task } from './data/data'

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [taskFlag, setTaskFlag] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/tasks');
      const todoData = await response.json();

      setTasks(todoData);
      // console.log("todoData: ",todoData);
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

  const addNewTask = async (taskName: string, priority: Task['priority']) => {
    const newTask: Task = {
      _id: Date.now(),
      taskTitle: capitalize(taskName.trim()),
      priority,
      progress: 'To Do'
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      const addResult = await response.json();
      // console.log("addResult: ", addResult);
    } catch (error) {
      console.error(error);
    }

    setIsAddTaskOpen(false);
    fetchTodos();
  }

  const editTask = async (id: number | undefined, taskName: string | null, priority: Task['priority'] | null, progress: Task['progress'] | null) => {
    // console.log(taskName, priority, progress);
    try {
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
      const editResult = await response.json();
    } catch (error) {
      console.error(error);
    }

    fetchTodos();
    setIsEditTaskOpen(false);
  }

  const deleteTask = async (dlt: Boolean) => {
    if (dlt) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tasks/${deleteTaskId}`, {
          method: 'DELETE'
        });
        const deleteResult = await response.json();
        // console.log("deleteResult: ", deleteResult);
      } catch (error) {
        console.error(error);
      }

      fetchTodos();
    }
    setIsDeleteTaskOpen(false);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='container'>
      <div className={isAddTaskOpen || isEditTaskOpen || isDeleteTaskOpen ? 'tasklist blurred' : 'tasklist'}>
        <header className='header'>
          <div className='logo'>Task List</div>
          <button className='addtask' onClick={addTaskPopup}>Add Task</button>
        </header>
        <div className='card-list'>
          {
            tasks.length > 0 ?
              tasks.map((data: Task) => {
                return <Card key={data?._id} data={data} editTaskPopup={editTaskPopup} editTask={editTask} deleteTaskPopup={deleteTaskPopup} />
              })
              : <p className='no-task'>No Task Found</p>
          }
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
