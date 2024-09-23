import "../assets/css/home.css";

import Navbar from "../components/navbar";
import { BillSplitParams, TagParams } from "../components/billSplitCard";
import BillSplitBox from "../components/billSplitBox";
import AuthContext from "../context/authContext";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
} from "../utility/myapi";

import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../context/userProfileContext";

const Home = () => {
  const { authTokens, username } = useContext(AuthContext);
  const { getImage } = useContext(UserProfileContext);
  const [billSplits, setBillSplits] = useState<BillSplitParams[]>([]);

  const getBillSplit = async () => {
    const URL = setBackendURL("billSplit/user");
    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: URL,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as BillSplitParams[];

      setBillSplits(data);
    });
  };

  useEffect(() => {
    getBillSplit();
  }, []);

  return (
    <div className="pages d-flex flex-column">
      <Navbar title="Home" />

      <main className="box text-color-white flex-grow-1 d-flex flex-column gap--l">
        <div className="greeting">
          <div className="d-flex justify-content-center">
            <img
              src={getImage(username)}
              alt=""
              className="img img--xl img--round"
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="my-text">Welcome Back!!</p>
            <h1 className="username my-header">{username}</h1>
          </div>
        </div>
        
        <BillSplitBox query={billSplits} />
      </main>
    </div>
  );
};

export default Home;
