import React from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';

const StudentPortal = () => {

    return(
        <div className="reg">
            <div id="portal-header">
                <h1 className="reg-header">Welcome, _____ </h1>
                <button className="btn-size" className="btn btn-light">Log out</button>
            </div>
            <h3>Practice Journal:</h3>
            <div>
                < TaskInput />
            </div>  

            <div>
            <iframe className="flatIO-element" src="https://flat.io/embed/5f5ac8f8c4feb36761f94c07?playbackMetronome=count-in" height="350" width="55%" frameBorder="0" allowfullscreen allow="midi"></iframe>
            </div>

        </div>
    )
}

export default StudentPortal;