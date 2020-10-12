import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentContext from "../context/StudentContext";
import TaskInput from "./TaskInput";
import Embed from "flat-embed";

const StudentPortal = () => {
  const { studentData } = useContext(StudentContext);
  const history = useHistory();

  const getScore = () => {
    var container = document.getElementById("embed-container");
    if (container != null) {
      new Embed(container, {
        width: "85%",
        height: "900",
        score: "5f7e53de891a521f30d475b2",
        embedParams: {
          appId: process.env.REACT_APP_FLAT_EMBED_ID,
          controlsPosition: "bottom",
          layout: "responsive",
        },
      });
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken && !studentData.student) history.push("/login");
  }, [studentData.student, history]);

  return (
    <div className="reg">
      <div id="portal-header">
        <h1 className="reg-header">
          Welcome
          {studentData && studentData.student
            ? ", " + studentData.student.firstName
            : "!"}
        </h1>
      </div>

      <div id="journal-input" >
        <h3>Practice Journal:</h3>
        <div>
          <TaskInput />
        </div>
      </div>

      <div id="embed-container">{getScore()}</div>
    </div>
  );
};

export default StudentPortal;
