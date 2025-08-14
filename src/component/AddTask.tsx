import { IoMdClose } from "react-icons/io";
import "./AddTask.css"
import { useState, type FormEvent } from "react";
import type { Task } from "../data/data";

type AddProps = {
    addTaskPopup: ()=>void;
    addNewTask: (taskName: string, priority: Task["priority"]) =>void;
}

function AddTask({addTaskPopup, addNewTask}: AddProps) {
    const [taskVal, setTaskVal] = useState('');
    const [select, setSelect] = useState<Task["priority"]>('High');
    function prioritySelect(val: Task['priority']){
        setSelect(val);
    }

    function handleTaskData(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskVal(e.target.value);
    }

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        addNewTask(taskVal, select);
    }

    return (
        <div className='addTask'>
            <div className="top">
                <p>Add Task</p>
                <button className="closeButton" onClick={addTaskPopup}><IoMdClose /></button>
            </div>
            <form className="main" onSubmit={handleFormSubmit}>
                <div>
                    <p>Task</p>
                    <input type="text" name="task" value={taskVal} onChange={handleTaskData} placeholder="send article to editor" required/>
                </div>
                <div>
                    <p>Priority</p>
                    <div className="priorityButtons">
                        <button type="button" onClick={() => prioritySelect('High')} className={select === 'High' ? 'high-selected' : 'high'}>High</button>
                        <button type="button" onClick={() => prioritySelect('Medium')} className={select === 'Medium' ? 'medium-selected' : 'medium'}>Medium</button>
                        <button type="button" onClick={() => prioritySelect('Low')} className={select === 'Low' ? 'low-selected' : 'low'}>Low</button>
                    </div>
                </div>
                <button type="submit" className='addButton'>Add</button>
            </form>
        </div>
    )
}

export default AddTask
