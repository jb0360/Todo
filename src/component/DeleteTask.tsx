import "./DeleteTask.css"

type DeleteProps = {
    deleteTask: (dlt: Boolean)=>void;
}

function DeleteTask({deleteTask}: DeleteProps) {
    
    return (
        <div className='deleteTask'>
            <p>Are you sure you want to delete this task?</p>
            <div className='buttons'>
                <button className="delete" onClick={()=>deleteTask(true)}>Delete</button>
                <button className="cancel" onClick={()=>deleteTask(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteTask
