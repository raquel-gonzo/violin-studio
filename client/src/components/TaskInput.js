
import React, { useState } from 'react'
import axios from 'axios';

const TaskInput = () => {
    const [task, setTask] = useState("")
    const [list, setList] = useState([])

    const saveTasks = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/students/tasks', {
            tasks: list
        })
    }

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const submitHandler = (e, task) => {
        e.preventDefault();
        setList([...list, task]);
        console.log(task);
      }

    return(
        <div>
        <form onSubmit={(e) => submitHandler(e, task)}  >
            <label>Add a task: </label>
            <input type="text" 
            name="task" 
            id="task" 
            placeholder="Etude 16, G minor scale, etc."
            onChange={ handleChange}
            />
            <input type="submit" value="Add"  />
        </form>

        <div>
            <ul>
                {list.map((task, index) => {
                    return <li key={index}> {task} <input type="checkbox"/>
                    </li>
                })}
            </ul>
            </div>
            <button onClick={saveTasks}>Save Tasks</button>
        </div>
    )
}

export default TaskInput;