import React, { useState, useEffect } from "react";
import "./App.css";
import Registration from "./components/Registration";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StudentPortal from "./components/StudentPortal";
import Login from "./components/Login";
import StudentContext from "./context/StudentContext";
import axios from "axios";
import Home from "./components/Home";

function App() {
  const [studentData, setStudentData] = useState({
    token: undefined,
    student: undefined,
  });

  useEffect(() => {
    //logging a user in is an asynchronus function. useEffect, is an 'automatic' function that happens on page load. We need to store the async function inside of useEffect hook.
    const checkLoggedIn = async () => {
      // define the function when the effect runs.
      let token = localStorage.getItem("auth-token"); // then goes to tutorial.routes to use 'token is Valid' method.
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      let tokenRes = await axios.post(
        "http://localhost:8000/students/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const studentRes = await axios.get("http://localhost:8000/students", {
          headers: { "x-auth-token": token },
        });
        setStudentData({
          token,
          student: studentRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <StudentContext.Provider value={{ studentData, setStudentData }}>
          {/* value should store state, which is the currently logged in student. */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/portal" component={StudentPortal} />
          </Switch>
        </StudentContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
