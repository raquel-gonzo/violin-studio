import React, { useEffect, useState, useContext } from "react";
import StudentContext from "../context/StudentContext";
import DeleteButton from "./DeleteBtn";

const List = (props) => {
  const { studentData } = useContext(StudentContext);

  return (
    <div>
      <ul>
        {studentData.student.List.map((task, index) => {
          return (
            <>
              <li key={index}>
                {" "}
                {task} <input key={"input" + index} type="checkbox" />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
