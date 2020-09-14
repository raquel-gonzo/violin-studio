import React, { useState } from "react";
import { Link } from "@reach/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log();
  };

  const handleUN = (e, username) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePW = (e, password) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <div className="reg">
      <h1 className="reg-header">Login</h1>
      <form className="form-group">
        <div className="form-group col-md-6">
          <label>Username: </label>
          <input
            className="form-control"
            onChange={handleUN}
            type="text"
          ></input>
        </div>
        <div className="form-group col-md-6">
          <label>Password: </label>
          <input
            className="form-control"
            onChange={handlePW}
            type="password"
          ></input>
        </div>

        <button id="login-btn" className="btn btn-light" onClick={handleClick}>
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
