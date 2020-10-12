import React from "react";
import AuthOptions1 from "../auth/AuthOptions1"

export default function Header() {
  return (
    <div id="header-auth">
      <span style={{margin: "0 8px"}}>Violin Studio </span>
      <AuthOptions1 />
    </div>
  );
}
