import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/Header.scss";
import codeRiseLogo from "../assets/static/Code_Rise_Logo.png";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={codeRiseLogo} alt="Code Rise Logo" />
      </Link>
      <div>
        <Link to="/login">
          <h2>Login</h2>
        </Link>
        <Link to="/register">
          <h2>Register</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
