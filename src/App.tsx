import { useState } from 'react'
import './App.css'
import AddTask from './component/AddTask'
import Card from './component/Card'
import DeleteTask from './component/DeleteTask'
import EditTask from './component/EditTask'
import tasksData from './data/data'
import type { Task } from './data/data'

function App() {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const addTaskPopup = () =>{
    setIsAddTaskOpen(prev => !prev);
  }

  const editTaskPopup = (data: Task | null) =>{
    setEditingTask(data);    
    setIsEditTaskOpen(prev => !prev);
  }
  // console.log(editingTask);
  

  const deleteTaskPopup = (dltId: Task['id']) =>{
    setDeleteTaskId(dltId);
    setIsDeleteTaskOpen(prev => !prev);
  }

  const addNewTask = (taskName: string, priority: Task['priority']) => {
    const newTask: Task = {
      id: Date.now(),
      task: taskName,
      priority,
      progress: 'To Do'
    }

    setTasks(prev => [...prev, newTask])
    setIsAddTaskOpen(false);
    // console.log("Final-Tasks:",tasks);
  }

  const editTask = (id: Number,taskName: string, priority: Task['priority'])=>{
    console.log("id:",id,"taskName", taskName, 'priority:', priority); 
    setTasks(prev => prev.map(task => task.id !== id ? task : {
      ...task,
      task: taskName,
      priority,
    }))
    setIsEditTaskOpen(false);
  }

  const deleteTask = (dlt: Boolean)=>{
    // console.log("delete", dlt, 'id:', deleteTaskId); 
    if (dlt) {
      setTasks(prev => prev.filter(task=> task.id !== deleteTaskId))
    }
    setIsDeleteTaskOpen(false);
  }

  return (
    <div className='container'>
      <div className={isAddTaskOpen || isEditTaskOpen || isDeleteTaskOpen? 'tasklist blurred' : 'tasklist'}>
        <header className='header'>
          <div className='logo'>Task List</div>
          <button className='addtask' onClick={addTaskPopup}>Add Task</button>
        </header>
        <div className='card-list'>
          {
            tasks.map((data: Task) => {
              return <Card key={data.id} data={data} editTaskPopup={editTaskPopup} deleteTaskPopup={deleteTaskPopup} />
            })
          }
        </div>
      </div>
      {isAddTaskOpen && (
        <div className="popup-show">
          <AddTask addTaskPopup={addTaskPopup} addNewTask={addNewTask}/>
        </div>
      )}
      {isEditTaskOpen && (
        <div className="popup-show">
          <EditTask editingTask={editingTask} editTaskPopup={editTaskPopup} editTask={editTask} />
        </div>
      )}
      {isDeleteTaskOpen && (
        <div className="popup-show">
          <DeleteTask deleteTask={deleteTask}/>
        </div>
      )}
    </div>
  )
}

export default App
