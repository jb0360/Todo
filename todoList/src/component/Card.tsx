import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './Card.css'
import type { Task } from "../data/data";
import { useState } from "react";

type CardProps = {
    data: Task;
    editTaskPopup: (data: Task) => void;
    deleteTaskPopup: (dltId: Task['_id']) => void;
    editTask: (id: number | undefined, taskName: string, priority: Task['priority'], progress: Task['progress']) => void;
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
        editTask(_id, taskTitle, priority, next);
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
                    <svg width="24" height="24" viewBox="0 0 24 24" className="circular-progressbar">
                        <circle className="circle-background" cx="12" cy="12" r="11" strokeWidth="2"></circle>
                        {
                            proValue === 'To Do' ? <circle className="circle-progress" cx="12" cy="12" r="11" strokeWidth="2" transform="rotate(-90 12 12)" 
                                                    style={{ strokeDasharray: "69.115", strokeDashoffset: "69.115" }}></circle>
                                : proValue === 'In progress' ? <circle className="circle-progress" cx="12" cy="12" r="11" strokeWidth="2" transform="rotate(-90 12 12)" 
                                                                style={{ strokeDasharray: "69.115", strokeDashoffset: "34.5575" }}></circle>
                                :   <circle className="circle-progress" cx="12" cy="12" r="11" strokeWidth="2" transform="rotate(-90 12 12)" 
                                style={{ strokeDasharray: "69.115", strokeDashoffset: "0" }}></circle>
                        }
                    </svg>
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
