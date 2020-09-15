import React, {useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import StudentContext from "../../context/StudentContext";

export default function Home ()  {
    const {studentData} = useContext(StudentContext);
    const history = useHistory();

    //if logged out, redirect to the login page.
    useEffect(() => {
        if (!studentData.student) history.push("/login");
    }, [studentData, history])

    return(
        <div>
            <h1>Homepage</h1>
            {/* <div>
                <Link to="/register">Register</Link>
                <Link to = "/login">Log in</Link>
            </div> */}
        </div>

    )
}

