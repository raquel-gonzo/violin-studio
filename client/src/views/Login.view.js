import React, { useState } from 'react';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        console.log();
    }

    const handleUN = (e, username) => {
        setUsername(e.target.value);
        console.log(username)
    }

    const handlePW = (e, password) => {
        setPassword(e.target.value);
        console.log(password)
    }

    return(
        <div>
            <h1>Login</h1>
            <form>
                <label>Username: </label>
                <input onChange={handleUN} type="text"></input>

                <label>Password: </label>
                <input onChange={handlePW} type="password" ></input>

                <button onClick={handleClick} >Login</button>

            </form>
        </div>
    )
}

export default Login;