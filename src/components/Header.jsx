import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/Header.scss";
import codeRiseLogo from "../assets/static/Code_Rise_Logo.png";

const Header = ({ children }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={codeRiseLogo} alt="Code Rise Logo" />
      </Link>
      <div className="children">
        {/* <Link to="/login">Acceder</Link>
        <Link to="/register">Registro</Link> */}
        {children}
      </div>
    </header>
  );
};

export default Header;
