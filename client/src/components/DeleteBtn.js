import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    let token = localStorage.getItem("auth-token");

    const {removeFromDom} = props;

    const deleteTasks = (task) => {
        console.log(task);
        axios.put('http://localhost:8000/students/deleteTask/' + task.studentId + "/" + task.title,
            {
                task: task,
                
            },
            { headers: { "x-auth-token": token } }
        )
        .then(res => {
            console.log(res);
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