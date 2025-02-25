import "../assets/css/profile.css";
import Navbar from "../components/navbar";
import AuthContext from "../context/authContext";
import { UserProfileContext } from "../context/userProfileContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { getImage } = useContext(UserProfileContext);
  const { username } = useContext(AuthContext);

  return (
    <div className="pages d-flex flex-column">
      <Navbar title="Profile" />
      <main className="d-flex flex-column box text-color-white flex-grow-1 gap-3">
        <div className="d-flex gap-5 px-5">
          <img
            src={getImage(username)}
            alt="Profile"
            className="img img--xl img--round"
          />
          <div className="d-flex flex-column justify-content-center flex-grow-1">
            <p className="my-text fs-1">Username: {username}</p>
            <Link to="/" className="my-text fs-2">
              change password
            </Link>
          </div>
        </div>
        <div className="info px-5">
          <p className="fs-1 info-header my-text my-text-bold">Email</p>
          <div className="info-block d-flex align-items-center px-3 py-2">
            <i className="bi bi-envelope-fill fs-1" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
