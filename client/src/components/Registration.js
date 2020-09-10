import React, { useState } from 'react';
import axios from 'axios'

const Registration = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [yearInSchool, setYearInSchool] = useState("1st")
    const [school, setSchool] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errs, setErrs] = useState({})

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/students/new", {
            firstName,
            lastName,
            yearInSchool,
            school,
            phone,
            email,
            password
        })
        .then((res) => {
            console.log(res.data)
            if (res.data.error.errors) {
                setErrs(res.data.error.errors)
            }
        }
    )
        .catch((err) => console.log(err));
    };

    // const isPasswordInvalid = () => {
    //     return password.length < 8 || password !== confirmPassword;
    // }

    // const isEmailInvalid = () => {
    //     const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
    //     return !emailRegex.test(email);
    // }

    return(
        <div >
            <form className="reg" className="form-group">
                <label>First Name: </label>
                {errs.firstName ? (
                    <p>{errs.firstName.message}</p>
                ) : null}
                <input className="form-control" type="text" onChange={(e) => setFirstName(e.target.value)} ></input>

                <label>Last Name: </label>
                {errs.lastName ? (
                    <p>{errs.lastName.message}</p>
                ) : null}
                <input className="form-control" type="text" onChange={(e) => setLastName(e.target.value)}></input>

                <label>Grade in School: </label>
                <select  className="form-control" onChange={(e) => setYearInSchool(e.target.value)}>
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

                <label>School Name: </label>
                {errs.school ? (
                    <p>{errs.school.message}</p>
                ) : null}
                <input className="form-control" type="text" onChange={(e) => setSchool(e.target.value)}></input>

                <label>Phone Number: </label>
                {errs.phone ? (
                    <p>{errs.phone.message}</p>
                ) : null}
                <input className="form-control" type="tel" onChange={(e) => setPhone(e.target.value)}></input>

                <label>Email: </label>
                {/* {isEmailInvalid() ? 
                    <span> please enter a valid email</span>
                : null
                } */}
                {errs.email ? (
                    <p>{errs.email.message}</p>
                ) : null}
                <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)}></input>

                <label>Password: </label>
                {errs.password ? (
                    <p>{errs.password.message}</p>
                ) : null}
                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)}></input>

                <label>Confirm Password: </label>
                <input className="form-control" type="password" onChange={(e) => setConfirmPassword(e.target.value)}></input>

                {/* disable this button if password and confirm 
                    password values are different */}
                <button 
                className="btn btn-info"
                // disabled={isPasswordInvalid() || isEmailInvalid()} 
                onClick={onSubmitHandler}>Register!</button>
            </form>
        </div>
    )
}

export default Registration;