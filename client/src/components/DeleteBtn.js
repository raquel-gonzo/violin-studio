import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    let token = localStorage.getItem("auth-token");

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
            // props.removeFromDom(task.studentId)
        })
    }
    return (
        <button className="btn btn-light" onClick={() => deleteTasks(props.task)}>
            Delete
        </button>
    )
}

export default DeleteButton;