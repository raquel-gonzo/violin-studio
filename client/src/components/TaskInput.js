import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import StudentContext from "../context/StudentContext";
import List from './List';

const TaskInput = () => {
  const {studentData} = useContext(StudentContext);
  const [task, setTask] = useState({
    title: "",
    studentId: ""
  });
  const [tasks, setTasks] = useState([]);

  // once studentData.students is defined, set it to tasks in state
  useEffect(() => {
    if (studentData.student) {
      setTasks(studentData.student.tasks);
    }
  }, studentData.student);

  const handleChange = (e) => {
    setTask({
      title: e.target.value,
      studentId: studentData.student ? studentData.student.id : ""
    });
  };

  const submitHandler = async (e, task) => {
    e.preventDefault();
    const token = localStorage.getItem("auth-token");

    if (!token || !task) return;

    axios.post("http://localhost:8000/tasks/", 
      task, 
      { headers: { "x-auth-token": token } },
    )
    const newTasks = [...tasks, task];
    
    axios.put("http://localhost:8000/students/registerTask", 
      { 
        tasks: newTasks 
      },
      { headers: { "x-auth-token": token } },
    )
    setTasks(newTasks);
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

        {/* <List /> */}

        <ul>
          {tasks.map((task, index) => {
            return (
              <li key={index}> 
                {task.title} <input type="checkbox" />
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

export default TaskInput;
