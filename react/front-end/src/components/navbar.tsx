import "../assets/css/navbar.css";
import favicon from "../assets/img/favicon.png";
import logoutIcon from "../assets/img/logout_157938.png";

import AuthContext from "../context/authContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

interface NavbarParams {
  title: string;
}

const Navbar = ({ title }: NavbarParams) => {
  const { logoutFunction } = useContext(AuthContext);
  return (
    <nav className="my-navbar d-flex">
      <Link to="/">
        <img src={favicon} alt="Logo" className="img img--small img--round" />
      </Link>
      <h1 className="my-navbar__title flex-grow-1">{title}</h1>
      <button className="my-navbar__logout-button" onClick={logoutFunction}>
        <img src={logoutIcon} alt="Logout" className="img img--small" />
      </button>
    </nav>
  );
};

export default Navbar;
