import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import StudentContext from "../../context/StudentContext";


export default function Login () {

  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const { setStudentData } = useContext(StudentContext);
  const history = useHistory();

  // const handleFN = (e, username) => {
  //   setFirstName(e.target.value);
  //   console.log(username);
  // };

  // const handlePW = (e, password) => {
  //   setPassword(e.target.value);
  //   console.log(password);
  // };

  const submit = async (e) => {
    e.preventDefault(); 
    const loginStudent = { firstName, password };
    const loginRes = await axios.post(
      "http://localhost:8000/students/login", 
      loginStudent
    );
    setStudentData({
      token: loginRes.data.token,
      student: loginRes.data.student,
    });

    console.log("loginRes.data");
    console.log(loginRes.data);
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
  };

  return (
    <div className="reg">
      <h1 className="reg-header">Login</h1>
      <form className="form-group">
        <div className="form-group col-md-6">
          <label>First name: </label>
          <input
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label>Password: </label>
          <input
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></input>
        </div>

        <button id="login-btn" className="btn btn-light" onClick={submit}>
          Login
        </button>
      </form>
      {/* <Link to="/register">Register</Link> */}
    </div>
  );
};
