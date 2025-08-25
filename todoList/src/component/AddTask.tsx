import { IoMdClose } from "react-icons/io";
import "./AddTask.css"
import { useState, type FormEvent } from "react";
import type { Task } from "../data/data";

type AddProps = {
    taskFlag: string;
    addTaskPopup: ()=>void;
    addNewTask: (taskName: string, priority: Task["priority"]) =>void;
    editingTask: Task | null;
    editTaskPopup: (data: Task | null) => void;
    editTask: (id: number | undefined, taskName: string, priority: Task['priority'], progress: Task['progress'])=>void;
}

function AddTask({taskFlag, addTaskPopup, addNewTask, editingTask, editTaskPopup, editTask}: AddProps) {
    const [id, setId] = useState(editingTask?._id);
    const [taskVal, setTaskVal] = useState<string | undefined>(taskFlag==='Add' ? "" : editingTask?.taskTitle);
    const [priority, setPriority] = useState<Task["priority"] | undefined>(taskFlag==='Add' ? "High" :editingTask?.priority);
    function prioritySelect(val: Task['priority']){
        setPriority(val);
    }
    
    function handleTaskData(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskVal(e.target.value);
    }

    console.log(editingTask);
    
    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();

        if (taskVal?.trim() && priority) {
            // console.log(taskVal.trim(), taskVal.length, taskFlag);
            taskFlag==='Add' ? addNewTask(taskVal, priority) : editTask(id, taskVal, priority, editingTask?.progress ?? "To Do");
        }
    }

    return (
        <div className='addTask'>
            <div className="top">
                <p>{taskFlag==='Add' ? "Add Task" : "Edit Task"}</p>
                <button className="closeButton" onClick={taskFlag==='Add' ? addTaskPopup : ()=>editTaskPopup(editingTask)}><IoMdClose /></button>
            </div>
            <form className="main" onSubmit={handleFormSubmit}>
                <div>
                    <p>Task</p>
                    <input type="text" name="my-task-title" value={taskVal} onChange={handleTaskData} placeholder="send article to editor" autoComplete="new-title" required/>
                </div>
                <div>
                    <p>Priority</p>
                    <div className="priorityButtons">
                        <button type="button" onClick={() => prioritySelect('High')} className={priority === 'High' ? 'high-selected' : 'high'}>High</button>
                        <button type="button" onClick={() => prioritySelect('Medium')} className={priority === 'Medium' ? 'medium-selected' : 'medium'}>Medium</button>
                        <button type="button" onClick={() => prioritySelect('Low')} className={priority === 'Low' ? 'low-selected' : 'low'}>Low</button>
                    </div>
                </div>
                <button type="submit" className='addButton'>{taskFlag==='Add' ? "Add" : "Edit"}</button>
            </form>
        </div>
    )
}

export default AddTask
