import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './Card.css'
import type { Task } from "../data/data";

type CardProps = {
  data: Task;
  editTaskPopup: (data: Task) => void;
  deleteTaskPopup: (dltId: Task['_id']) => void;
};

function Card({ data, editTaskPopup, deleteTaskPopup }: CardProps) {
    const {_id, taskTitle, priority, progress } = data;

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
                    <div className='progress'>{progress}</div>
                </div>
                <div>
                    <div className='progress-display'></div>
                </div>
                <div className='buttons'>
                    <button onClick={()=>editTaskPopup(data)}><FiEdit /></button>
                    <button style={{ color: "red" }} onClick={()=>deleteTaskPopup(_id)}><RiDeleteBinLine /></button>
                </div>
            </div>
        </div>
    )
}

export default Card
