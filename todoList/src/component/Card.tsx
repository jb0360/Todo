import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './Card.css'
import type { Task } from "../data/data";
import { useState } from "react";

type CardProps = {
    data: Task;
    editTaskPopup: (data: Task) => void;
    deleteTaskPopup: (dltId: Task['_id']) => void;
    editTask: (id: number | undefined, taskName: string | null, priority: Task['priority'] | null, progress: Task['progress'] | null) => void;
};

function Card({ data, editTaskPopup, deleteTaskPopup, editTask }: CardProps) {
    const { _id, taskTitle, priority, progress } = data;
    const [proValue, setProValue] = useState(progress);
    const progressStates: Task["progress"][] = ["To Do", "In progress", "Done"];

    function getNextProgress(current: Task["progress"]) {
        const idx = progressStates.indexOf(current);
        return progressStates[(idx + 1) % progressStates.length];
    }

    const handleProgressChange = () => {
        const next = getNextProgress(proValue);
        setProValue(next);
        editTask(_id, null, null, next);
    }

    return (
        <div className="card">
            <div className='card-left'>
                <p>Task</p>
                <div>{taskTitle}</div>
            </div>
            <div className='card-right'>
                <div className='priority'>
                    <p>Priority</p>
                    <div style={{
                        color: priority === 'High' ? 'red' :
                            priority === 'Medium' ? 'orange' :
                                priority === 'Low' ? 'green' : 'black',
                        fontWeight: "700"
                    }}>{priority}</div>
                </div>
                <div>
                    <button className='progress' onClick={handleProgressChange}>{proValue}</button>
                </div>
                <div>
                    <div className='progress-display'></div>
                </div>
                <div className='buttons'>
                    <button onClick={() => editTaskPopup(data)}><FiEdit /></button>
                    <button style={{ color: "red" }} onClick={() => deleteTaskPopup(_id)}><RiDeleteBinLine /></button>
                </div>
            </div>
        </div>
    )
}

export default Card
