import React, { useState } from "react";
import axios from "axios";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const saveTasks = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8000/api/students/tasks", {
      tasks: list,
    });
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e, task) => {
    e.preventDefault();
    setList([...list, task]);
    console.log(task);
  };

  return (
    <div>
      <form className="form-group" onSubmit={(e) => submitHandler(e, task)}>
        <div className="form-group col-md-7">
          <div className="col-7">
            <label>Add a task: </label>
            <input
              className="form-control"
              type="text"
              name="task"
              id="task"
              placeholder="Etude 16, G minor scale, etc."
              onChange={handleChange}
            />
          </div>

          <button type="submit" id="task-btn" className="btn btn-light">Add</button>
        </div>
      </form>

      <div>
        <ul>
          {list.map((task, index) => {
            return (
              <li key={index}>
                {" "}
                {task} <input type="checkbox" />
              </li>
            );
          })}
        </ul>
      </div>
      {/* <button className="btn btn-light" onClick={saveTasks}>
        Save Tasks
      </button> */}
    </div>
  );
};

export default TaskInput;
