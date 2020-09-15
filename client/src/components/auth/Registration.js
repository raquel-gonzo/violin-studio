import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import StudentContext from "../../context/StudentContext";

import axios from "axios";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearInSchool, setYearInSchool] = useState("1st");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errs, setErrs] = useState({});

  // const { setStudentData } = useContext(StudentContext);

  const submit = async (e) => {
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
    const loginRes = await axios.post("http://localhost:8000/students/register", {
      firstName,
      lastName,
      yearInSchool,
      school,
      phone,
      email,
      password,
      confirmPassword
    });
    // setStudentData({
    //   token: loginRes.data.token,
    //   student: loginRes.data.student,
    // });
    console.log("loginRes.data");
    console.log(loginRes.data);
    localStorage.setItem("auth-token", loginRes.data.token);
  };

  // const registerRes = await axios.post(
  //   "http://localhost:8000/students/register",
  //   newStudent
  // );


  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8000/api/students/new", {
  //       firstName,
  //       lastName,
  //       yearInSchool,
  //       school,
  //       phone,
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data.error.errors) {
  //         setErrs(res.data.error.errors);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const isPasswordInvalid = () => {
  //     return password.length < 8 || password !== confirmPassword;
  // }

  // const isEmailInvalid = () => {
  //     const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
  //     return !emailRegex.test(email);
  // }

  return (
    <div className="reg">
      <h1 className="reg-header">Register</h1>
      <form className="form-group">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            {errs.firstName ? (
              <span className="error-message">{errs.firstName.message}</span>
            ) : null}
          </div>

          <div className="form-group col-md-6">
            <label>Last Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            {errs.lastName ? (
              <span className="error-message">{errs.lastName.message}</span>
            ) : null}
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
            {errs.school ? (
              <span className="error-message">{errs.school.message}</span>
            ) : null}
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
            {errs.phone ? (
              <span className="error-message">{errs.phone.message}</span>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label>Email: </label>
            <input
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {errs.email ? (
              <span className="error-message">{errs.email.message}</span>
            ) : null}
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
            {errs.password ? (
              <span className="error-message">{errs.password.message}</span>
            ) : null}
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
        <Link to="/login">Log in</Link>
      </form>
    </div>
  );
};

export default Registration;
