import "../assets/css/navbar.css";
import favicon from "../assets/img/favicon.png";
import logoutIcon from "../assets/img/logout_157938.png";
import menuIcon from "../assets/img/menu.png";

import AuthContext from "../context/authContext";
import MenuElement from "./menu";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";

interface NavbarParams {
  title: string;
  profileImage: string;
}

interface MenuParams {
  children: JSX.Element | JSX.Element[];
}

const Navbar = ({ title, profileImage }: NavbarParams) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { logoutFunction } = useContext(AuthContext);

  /* This function is use to determine the class of a menu */
  const setMenuClass = () => {
    const defaultClass = "my-menu option__display-mobile";
    return isMenuActive ? defaultClass : defaultClass + " none";
  };

  const Menu = ({ children }: MenuParams) => {
    return <div className={setMenuClass()}>{children}</div>;
  };

  return (
    <nav className="navbar-box box--white-text">
      <div className="my-navbar d-flex">
        <Link to="/">
          <img src={favicon} alt="Logo" className="img img--small img--round" />
        </Link>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <h1 className="my-navbar__title flex-grow-1">{title}</h1>
        </div>
        <div className="my-navbar__option d-flex">
          <img
            src={profileImage}
            alt=""
            className="img img--round img--small option__display-desktop"
          />
          <button
            className="my-navbar__logout-button option__display-desktop"
            onClick={logoutFunction}
          >
            <img src={logoutIcon} alt="Logout" className="img img--xs" />
          </button>

          <button
            className="my-navbar__menu-button option__display-mobile"
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <img src={menuIcon} alt="" className="img img--small" />
          </button>
        </div>
      </div>
      <Menu>
        <MenuElement
          name="Profile"
          imageURL={profileImage}
          handleSubmit={() => {}}
          imageRound={true}
        />
        <MenuElement
          name="Logout"
          imageURL={logoutIcon}
          handleSubmit={logoutFunction}
        />
      </Menu>
    </nav>
  );
};

export default Navbar;
