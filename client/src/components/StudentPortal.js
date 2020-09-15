import React, {useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import StudentContext from "../context/StudentContext";
import TaskInput from './TaskInput';


const StudentPortal = () => {

    const {studentData} = useContext(StudentContext);
    const history = useHistory();

    useEffect(() => {
        const authToken = localStorage.getItem("auth-token");

        if (!authToken && !studentData.student) history.push("/login");
    }, [studentData.student])



    return(
        <div className="reg">
            <div id="portal-header">
                <h1 className="reg-header">Welcome 
                    {studentData && studentData.student ? ", " + studentData.student.firstName : "!"} 
                </h1>
                {/* <button className="btn-size" className="btn btn-light">Log out</button> */}
            </div>
            <h3>Practice Journal:</h3>
            <div>
                <TaskInput />
            </div>  

            <div>
            <iframe title ="g-minor" className="flatIO-element" src="https://flat.io/embed/5f5ac8f8c4feb36761f94c07?playbackMetronome=count-in" height="350" width="55%" frameBorder="0" allowfullscreen allow="midi"></iframe>
            </div>

        </div>
    )
}

export default StudentPortal;