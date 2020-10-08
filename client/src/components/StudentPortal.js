import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentContext from "../context/StudentContext";
import TaskInput from "./TaskInput";
import Embed from 'flat-embed';

const StudentPortal = () => {
  const { studentData } = useContext(StudentContext);
  const history = useHistory();

  const getScore = () => {
    var container = document.getElementById('embed-container');
    if (container != null) {
      console.log(process.env);
      console.log(process.env.REACT_APP_FLAT_EMBED_ID);
      var embed = new Embed(container, {
        width: "85%",
        height: "900",
        score: "5f7e53de891a521f30d475b2",
        embedParams: {
          appId: process.env.REACT_APP_FLAT_EMBED_ID,
          controlsPosition: 'bottom',
          layout: "responsive",
        }
      });
    }
  }


  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken && !studentData.student) history.push("/login");
  }, [studentData.student]);

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

      <h3>Practice Journal:</h3>
      <div>
        <TaskInput />
      </div>

      <div id='embed-container'>
      {getScore()}
        {/* <iframe
          title="g-minor"
          className="flatIO-element"
          src="https://flat.io/embed/5f5ac8f8c4feb36761f94c07?playbackMetronome=count-in"
          height="350"
          width="80%"
          frameBorder="0"
          allow="midi"
        ></iframe> */}
      </div>
    </div>
  );
};

export default StudentPortal;
