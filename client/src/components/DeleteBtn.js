import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    let token = localStorage.getItem("auth-token");

    const {removeFromDom} = props;
    const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

    const deleteTasks = (task) => {
        axios.put(baseURL + '/students/deleteTask/' + task.studentId + "/" + task.title,
            {
                task: task,
                
            },
            { headers: { "x-auth-token": token } }
        )
        .then(res => {
            removeFromDom(task.title);
        })
    }
    return (
        <button className="btn btn-light delete-btn" onClick={(e) => deleteTasks(props.task)}>
            Delete
        </button>
    )
}

export default DeleteButton;