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
      console.log(error);
    }
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
    const capitalize = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const newTask: Task = {
      _id: Date.now(),
      taskTitle: capitalize(taskName),
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
      console.log(error);
    }

    setIsAddTaskOpen(false);
    fetchTodos();
  }

  const editTask = async (id: number | undefined, taskName: string, priority: Task['priority']) => {
    if (id && taskName && priority) {
      console.log(id, `http://localhost:8080/api/v1/tasks/${id}`);
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({taskTitle: taskName, priority})
        });
        const editResult = await response.json();
        console.log("editResult: ", editResult);
      } catch (error) {
        console.log(error);
      }

      fetchTodos();
    }

    setIsEditTaskOpen(false);
  }

  const deleteTask = (dlt: Boolean) => {
    if (dlt) {
      setTasks(prev => prev.filter(task => task._id !== deleteTaskId))
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
                return <Card key={data?._id} data={data} editTaskPopup={editTaskPopup} deleteTaskPopup={deleteTaskPopup} />
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
