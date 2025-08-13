import './App.css'
import AddTask from './component/AddTask'
import Card from './component/Card'
import DeleteTask from './component/DeleteTask'
import EditTask from './component/EditTask'
import datas from "./data/data"

function App() {
  return (
    <div className='tasklist'>
      <header className='header'>
        <div className='logo'>Task List</div>
        <button className='addtask'>Add Task</button>
      </header>
      <div className='card-list'>
        {
          datas.map((data: Object)=>{
            return <Card key={data.id} data={data}/>
          })
        }
      </div>
      <AddTask />
      <DeleteTask />
      <EditTask />
    </div>
  )
}

export default App
