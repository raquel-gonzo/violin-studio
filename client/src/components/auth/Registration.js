import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentContext from "../../context/StudentContext";

import axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearInSchool, setYearInSchool] = useState("1st");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setStudentData } = useContext(StudentContext);
  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const newStudent = {
        firstName,
        lastName,
        yearInSchool,
        school,
        phone,
        email,
        password,
        confirmPassword,
      };

      const registerResponse = await axios.post(
        "http://localhost:8000/students/register",
        newStudent
      );

      setStudentData({
        token: registerResponse.data.token,
        student: registerResponse.data.student,
      });

      console.log("registerResponse.data");
      console.log(registerResponse.data);
      localStorage.setItem("auth-token", registerResponse.data.token);
      history.push("/");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="reg">
      <h1 className="reg-header">Register</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form-group">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>

          <div className="form-group col-md-6">
            <label>Last Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            {/* {error.lastName ? (
              <span className="error-message">{error.lastName.message}</span>
            ) : null} */}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Grade in School: </label>
            <select
              className="form-control"
              onChange={(e) => setYearInSchool(e.target.value)}
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
              <option>7th</option>
              <option>8th</option>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
              <option>College Student</option>
              <option>Adult Student</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label>School Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setSchool(e.target.value)}
            ></input>
            {/* {error.school ? (
              <span className="error-message">{error.school.message}</span>
            ) : null} */}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Phone Number: </label>
            <input
              className="form-control"
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            {/* {error.phone ? (
              <span className="error-message">{error.phone.message}</span>
            ) : null} */}
          </div>
          <div className="form-group col-md-6">
            <label>Email: </label>
            <input
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {/* {error.email ? (
              <span className="error-message">{error.email.message}</span>
            ) : null} */}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password: </label>
            <input
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {/* {error.password ? (
              <span className="error-message">{error.password.message}</span>
            ) : null} */}
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password: </label>
            <input
              className="form-control"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
        </div>

        {/* disable this button if password and confirm 
                    password values are different */}
        <button
          className="btn btn-light"
          // disabled={isPasswordInvalid() || isEmailInvalid()}
          onClick={submit}
        >
          Register!
        </button>
        {/* <Link to="/login">Log in</Link>  */}
      </form>
    </div>
  );
};

export default Registration;
