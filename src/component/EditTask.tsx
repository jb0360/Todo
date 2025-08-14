import { IoMdClose } from "react-icons/io";
import "./AddTask.css"
import type { Task } from "../data/data"
import { useState, type FormEvent } from "react";

type EditProps = {
    editingTask: Task | null;
    editTaskPopup: (data: Task | null) => void;
    editTask: (id: Number | undefined, taskName: string, priority: Task['priority'])=>void;
}

function EditTask({editingTask, editTaskPopup, editTask}: EditProps) {
    const [id, setId] = useState(editingTask?.id);
    const [taskVal, setTaskVal] = useState<string | undefined>(editingTask?.task);
    const [priority, setPriority] = useState<Task["priority"] | undefined>(editingTask?.priority);
    const prioritySelect = (val: Task['priority']) => {
        setPriority(val);
    }

    const handleTaskData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskVal(e.target.value);
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (taskVal && priority) {
            editTask(id, taskVal, priority);
        }
    }

    // console.log("into edit",editingTask);

    return (
        <div className='addTask'>
            <div className="top">
                <p>Edit Task</p>
                <button className="closeButton" onClick={()=>editTaskPopup(editingTask)}><IoMdClose /></button>
            </div>
            <form className="main" onSubmit={handleFormSubmit}>
                <div>
                    <p>Task</p>
                    <input type="text" name="task" value={taskVal} onChange={handleTaskData} required/>
                </div>
                <div>
                    <p>Priority</p>
                    <div className="priorityButtons">
                        <button type="button" onClick={() => prioritySelect('High')} className={priority === 'High' ? 'high-selected' : 'high'}>High</button>
                        <button type="button" onClick={() => prioritySelect('Medium')} className={priority === 'Medium' ? 'medium-selected' : 'medium'}>Medium</button>
                        <button type="button" onClick={() => prioritySelect('Low')} className={priority === 'Low' ? 'low-selected' : 'low'}>Low</button>
                    </div>
                </div>
                <button type="submit" className='addButton'>Edit</button>
            </form>
        </div>
    )
}

export default EditTask
