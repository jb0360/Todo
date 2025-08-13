import { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './Card.css'

function Card(props: Object) {
    const { task, priority, progress } = props.data;

    return (
        <div className="card">
            <div className='card-left'>
                <p>Task</p>
                <div>{task}</div>
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
                    <button><FiEdit /></button>
                    <button style={{ color: "red" }}><RiDeleteBinLine /></button>
                </div>
            </div>
        </div>
    )
}

export default Card
