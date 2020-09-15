import React from "react";
import { Link } from "react-router-dom";
import AuthOptions1 from "../auth/AuthOptions1"

export default function Header() {
  return (
    <div>
      <Link to="/">
        <h1>Home Page</h1>
      </Link>
      <AuthOptions1 />
    </div>
  );
}
