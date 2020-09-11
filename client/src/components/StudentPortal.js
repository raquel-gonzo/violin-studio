import React from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';

const StudentPortal = () => {

    return(
        <div>
            <h1>Welcome, _____ </h1>
            <h2>Happy Practicing!</h2>

            <div>
                < TaskInput />
            </div>  

            <div>
            <iframe src="https://flat.io/embed/5f5ac8f8c4feb36761f94c07?playbackMetronome=count-in" height="350" width="55%" frameBorder="0" allowfullscreen allow="midi"></iframe>
            </div>

        </div>
    )
}

export default StudentPortal;