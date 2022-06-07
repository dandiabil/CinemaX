import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../Menu/Menu";
import { userLogOut } from "../../Redux/reducer/userSlice";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = useSelector((state) => state.user.isAuthenticated) || false;
  const dispatch = useDispatch();

  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(userLogOut());
    window.location.reload();
  }

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <Link to="/" className="header__logo">
            CinemaX
          </Link>
          <nav className="header__nav">
            <ul>
              <Link to="/catalogs">Catalogs</Link>
              <Link to="/cart">Cart</Link>
              <Link
                to={auth ? "" : "/login"}
                onClick={auth ? handleLogout : ""}
              >
                <Button
                  name={auth ? "Logout" : "Sign In"}
                  className="button__signin"
                />
              </Link>
            </ul>
            <Icon
              icon="charm:menu-hamburger"
              className="icon__burger"
              onClick={toggleMenu}
            />
          </nav>
        </div>
      </header>
      {openMenu && (
        <Menu onClick={toggleMenu} auth={auth} logout={handleLogout} />
      )}
    </>
  );
};

export default Header;
