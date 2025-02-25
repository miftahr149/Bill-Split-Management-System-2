import "../assets/css/profile.css";
import Navbar from "../components/navbar";
import AuthContext from "../context/authContext";
import { UserProfileContext } from "../context/userProfileContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIFetch, setBackendURL, tryCatchFetch } from "../utility/myapi";

interface BankData {
  name: string;
  number: string;
  qr: string;
  owner: number;
};

interface TelegramInfo {
  telegram_usename: string
}

interface UserProfileInfo {
  bank_info: BankData[];
  email: string;
  telegram_info: TelegramInfo;
}

const setDefaultProfileInfo: (() => UserProfileInfo) = () => ({
  bank_info: [],
  email: "",
  telegram_info: {
    telegram_usename: ""
  }
})

const Profile = () => {
  const { getImage } = useContext(UserProfileContext);
  const { username } = useContext(AuthContext);

  const [{email}, setProfileInfo] = useState<UserProfileInfo>(setDefaultProfileInfo);

  const getProfileInfo = () => {
    tryCatchFetch(async () => {
      const data: UserProfileInfo = await APIFetch({
        URL: setBackendURL("getUserProfileInfo"),
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({username: username})
      });
      setProfileInfo(() => data);
    })
  }

  useEffect(getProfileInfo, []);

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
          <div className="info-block d-flex align-items-center px-3 py-2 gap-5">
            <i className="bi bi-envelope-fill fs-1" />
            <p className="my-text fs-2 flex-grow-1">{email}</p>
            <button className="btn btn-success">Change Email</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
