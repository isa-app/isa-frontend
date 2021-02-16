import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer p-4">
      <Link to="/">Términos de uso</Link>
      <Link to="/">Declaración de privacidad</Link>
    </footer>
  );
};

export default Footer;
