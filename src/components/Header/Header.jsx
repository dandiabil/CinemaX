import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          CinemaX
        </Link>
        <nav className="header__nav">
          <ul>
            <Link to="/catalogs">Catalogs</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">
              <Button name="Sign In" className="button-signin-red" />
            </Link>
          </ul>
          <Icon icon="charm:menu-hamburger" className="icon__burger" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
