import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import StudentContext from "../context/StudentContext";
import List from './List';
import DeleteButton from "./DeleteBtn";

const TaskInput = () => {
  const {studentData} = useContext(StudentContext);
  const [task, setTask] = useState({
    title: "",
    studentId: ""
  });
  const [tasks, setTasks] = useState([]);
 
  const removeFromDom = taskTitle => {
    setTasks(tasks.filter(task => task.title !== taskTitle)); // dont use the studentId because it's the same for each task. 
    // we need to use the array of tasks, not one individual tasks. we are updating the list.
  }

  // once studentData.students is defined, set it to tasks in state
  useEffect(() => {
    console.log("studentData");
    console.log(studentData);
    if (studentData.student && studentData.student.tasks) {
      setTasks(studentData.student.tasks);
    }
  }, [studentData.student]);

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

    const newTasks = [...tasks, task];
    const baseURL = process.env.BASE_URL || "http://localhost:8000";

    axios.put(baseURL + "/students/registerTask", 
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
        <ul id='list-container' style={{padding: 0}}>
          {tasks && tasks.map((task, index) => {
            return (
                <div className="list-style" key={"container" + index}>
                <li key={"li" + index}> 
                  {task.title} <input key={"input" + index} type="checkbox" />
                </li>
                <DeleteButton key={"delete" + index} task={task} removeFromDom={removeFromDom} /> 
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskInput;
