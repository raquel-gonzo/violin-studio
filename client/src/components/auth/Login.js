import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import StudentContext from "../../context/StudentContext";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setStudentData } = useContext(StudentContext);
  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const loginStudent = { firstName, password };
      const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

      const loginRes = await axios.post(
        baseURL + "/students/login",
        loginStudent
      );
      setStudentData({
        token: loginRes.data.token,
        student: loginRes.data.student,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/portal");
    } catch (error) {
      error.response && error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="reg">
      <h1 className="reg-header">Login</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
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
    </div>
  );
}
