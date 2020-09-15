import React from "react";

export default function ErrorNotice(props) {
  return <>
  <span className="error-message">
      {props.message}</span>
  <button className="btn btn-light btn-size btn-nav" onClick={props.clearError } >x</button>
  </>

}
