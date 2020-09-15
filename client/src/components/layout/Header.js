import React from "react";
import { Link } from "react-router-dom";
import AuthOptions1 from "../auth/AuthOptions1"

export default function Header() {
  return (
    <div id="header-auth">
      <Link to="/">
        <span style={{margin: "0 8px"}}>Home Page</span>
      </Link>
      <AuthOptions1 />
    </div>
  );
}
