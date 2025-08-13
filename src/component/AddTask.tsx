import { IoMdClose } from "react-icons/io";
import "./AddTask.css"
import { useState } from "react";

function AddTask() {
    const [select, setSelect] = useState('High');
    const prioritySelect = (val: String) => {
        setSelect(val);
    }
    return (
        <div className='addTask'>
            <div className="top">
                <p>Add Task</p>
                <button className="closeButton"><IoMdClose /></button>
            </div>
            <div className="main">
                <div>
                    <p>Task</p>
                    <input type="text" name="task" placeholder="send article to editor" />
                </div>
                <div>
                    <p>Priority</p>
                    <div className="priorityButtons">
                        <button onClick={() => prioritySelect('High')} className={select === 'High' ? 'high-selected' : 'high'}>High</button>
                        <button onClick={() => prioritySelect('Medium')} className={select === 'Medium' ? 'medium-selected' : 'medium'}>Medium</button>
                        <button onClick={() => prioritySelect('Low')} className={select === 'Low' ? 'low-selected' : 'low'}>Low</button>
                    </div>
                </div>
            </div>
            <button className='addButton'>Add</button>
        </div>
    )
}

export default AddTask
