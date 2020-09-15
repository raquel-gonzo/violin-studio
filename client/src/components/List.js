import React, { useEffect, useState, useContext } from 'react';
import StudentContext from "../context/StudentContext";


const List = (props) => {

    const {studentData} = useContext(StudentContext);


    return(
        <div>
            <ul>
            {studentData.studetnt.List.map((task, index) => {
                return <li key={index}> {task} <input type="checkbox"/>
                </li>
            })}
        </ul>
        </div>
    )
}

export default List;