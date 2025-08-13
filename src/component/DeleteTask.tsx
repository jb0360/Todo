import "./DeleteTask.css"

function DeleteTask() {
    return (
        <div className='deleteTask'>
            <p>Are you sure you want to delete this task?</p>
            <div className='buttons'>
                <button className="delete">Delete</button>
                <button className="cancel">Cancel</button>
            </div>
        </div>
    )
}

export default DeleteTask
