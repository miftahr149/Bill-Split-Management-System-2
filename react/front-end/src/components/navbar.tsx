import "../assets/css/navbar.css";
import favicon from "../assets/img/favicon.png";
import logoutIcon from "../assets/img/logout_157938.png";

import AuthContext from "../context/authContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

interface NavbarParams {
  title: string;
  profileImage: string;
}

const Navbar = ({ title, profileImage }: NavbarParams) => {
  const { logoutFunction } = useContext(AuthContext);

  return (
    <nav className="my-navbar d-flex">
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

        <button className="option__display-mobile">

        </button>
      </div>
    </nav>
  );
};

export default Navbar;