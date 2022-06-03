import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const Menu = ({ onClick, auth, logout }) => {
  return (
    <div className="menu">
      <div className="menu__wrapper">
        <div className="menu__close" onClick={onClick}>
          <Icon icon="ant-design:close-outlined" />
        </div>
        <nav className="menu__nav">
          <div className="nav__link">
            <Link to="/catalogs">Catalogs</Link>
          </div>
          <div className="nav__link">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="nav__link">
            <Link to={auth ? "" : "/login"} onClick={auth ? logout : ""}>
              {auth ? "Log Out" : "Sign In"}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
