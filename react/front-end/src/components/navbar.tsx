import "../assets/css/navbar.css";
import favicon from "../assets/img/favicon.png";
import logoutIcon from "../assets/img/logout_157938.png";
import menuIcon from "../assets/img/menu.png";

import AuthContext from "../context/authContext";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserProfileContext } from "../context/userProfileContext";

interface NavbarParams {
  title: string;
}

interface MenuParams {
  children: JSX.Element | JSX.Element[];
  isActive: boolean;
}

interface MenuElementParams {
  handleSubmit: () => void;
  name: string;
  src: string;
  imageRound?: boolean;
}

interface BaseImageButtonParams {
  src: string;
  imageRound?: boolean;
  alt: string;
}

interface LinkImageButtonParams extends BaseImageButtonParams {
  to: string;
}

interface ImageButtonParams extends BaseImageButtonParams {
  handleClick:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  display: "desktop" | "mobile";
}

const Image = ({ imageRound, src, alt }: BaseImageButtonParams) => {
  const setImageClass = () => {
    const defaultClass = "img img--sm";
    return imageRound ? defaultClass + " img--round" : defaultClass;
  };

  return <img src={src} alt={alt} className={setImageClass()} />;
};

const MenuElement = ({
  handleSubmit,
  name,
  ...imageParams
}: MenuElementParams) => {
  return (
    <button
      className="elements my-button d-flex align-items-center"
      onClick={handleSubmit}
    >
      <Image {...imageParams} alt={name} />
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <p className="my-text text-center flex-grow-1">{name}</p>
      </div>
    </button>
  );
};

const LinkImageButton = ({ to, ...imageParams }: LinkImageButtonParams) => {
  return (
    <Link to={to}>
      <Image {...imageParams} />
    </Link>
  );
};

const ImageButton = ({
  handleClick,
  display,
  ...imageParams
}: ImageButtonParams) => {
  const setButtonClass = () => {
    const defaultClass = "my-button";
    return display === "desktop"
      ? defaultClass + " display-desktop"
      : defaultClass + " display-mobile";
  };

  return (
    <button className={setButtonClass()} onClick={handleClick}>
      <Image {...imageParams} />
    </button>
  );
};

const Menu = ({ children, isActive }: MenuParams) => {
  const setMenuClass = () => {
    const defaultClass = "my-menu display-mobile";
    return isActive ? defaultClass : defaultClass + " none";
  };

  return <div className={setMenuClass()}>{children}</div>;
};

const Navbar = ({ title }: NavbarParams) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const {getImage} = useContext(UserProfileContext);
  const { logoutFunction, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuClick = () => setIsMenuActive(!isMenuActive);

  return (
    <nav className="navbar-box text-color-white">
      <div className="my-navbar d-flex">
        <LinkImageButton to="/" src={favicon} alt="icon" imageRound={true} />
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <h1 className="my-header text-center flex-grow-1">
            {title}
          </h1>
        </div>

        <div className="gap d-flex">
          <ImageButton
            handleClick={() => {navigate("/profile")}}
            src={getImage(username)}
            alt="Profile"
            imageRound={true}
            display="desktop"
          />

          <ImageButton
            handleClick={logoutFunction}
            src={logoutIcon}
            alt="Logout"
            display="desktop"
          />

          <ImageButton
            handleClick={handleMenuClick}
            src={menuIcon}
            alt="menu"
            display="mobile"
          />
        </div>
      </div>

      <Menu isActive={isMenuActive}>
        <MenuElement
          name="Profile"
          src={getImage(username)}
          handleSubmit={() => {}}
          imageRound={true}
        />
        <MenuElement
          name="Logout"
          src={logoutIcon}
          handleSubmit={logoutFunction}
        />
      </Menu>
    </nav>
  );
};

export default Navbar;
