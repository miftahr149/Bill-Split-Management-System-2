import Navbar from "../components/navbar";
import "../assets/css/home.css";

import { jwtDecode } from "jwt-decode";

import AuthContext from "../context/authContext";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
} from "../utility/myapi";

import { useEffect, useState, useContext } from "react";

interface TagParams {
  id: number;
  name: string;
}

const Home = () => {
  const [tags, setTags] = useState<TagParams[]>([]);
  const { authTokens, username } = useContext(AuthContext);
  const [image, setImage] = useState<string>("");

  const getTags = async () => {
    console.log("Fetching Tags From the Backend");
    const URL = setBackendURL("tag");

    const data = await APIFetch({
      URL: URL,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthorization(authTokens.access),
      },
    });

    setTags(data);
    console.log("Successfuly Fetching Tags");
  };

  const getImage = async () => {
    console.log("Fetching User's Photo Profile From the Backend");

    tryCatchFetch(async () => {
      const { image } = (await APIFetch({
        URL: setBackendURL("userImage"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as { image: string };
      setImage(setBackendURL(image.slice(1)));
    });
  };

  useEffect(() => {
    getImage();
    getTags();
  }, [])

  return (
    <div className="home pages">
      <Navbar title="Home" profileImage={image} />
      <main className="home__main box box--white-text">
        <div className="greeting">
          <div className="d-flex justify-content-center">
            <img src={image} alt="" className="img img--xl img--round" />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="my-text">Welcome Back!!</p>
            <h1 className="my-header my-header--l">{username}</h1>
            <h1></h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
