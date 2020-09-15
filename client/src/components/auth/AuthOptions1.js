// buttons that appear --> determined by whether a student is logged in or not.
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentContext from "../../context/StudentContext";

export default function AuthOptions() {
  const { studentData, setStudentData } = useContext(StudentContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
      setStudentData({
          token: undefined,
          student: undefined
      })
      localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {/* Conditional rendering for  */}
      {studentData.student ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}
