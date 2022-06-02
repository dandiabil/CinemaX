import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__title">Copyright&copy; 2022 - CinemaX</p>
        <Link to="/" className="header__logo">
          CinemaX
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
