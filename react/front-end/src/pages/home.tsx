import Navbar from "../components/navbar";
import "../assets/css/home.css";

import AuthContext from "../context/authContext";
import { setBackendURL, setAuthorization, APIFetch, tryCatchFetch } from "../utility/utility";
import { useEffect, useState, useContext } from "react";

interface TagParams {
  id: number;
  name: string;
}

const Home = () => {
  const [tags, setTags] = useState<TagParams[]>([]);
  const { authTokens } = useContext(AuthContext);
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
      const { image } = await APIFetch({
        URL: setBackendURL("userImage"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access)
        }
      }) as {image : string}
      setImage(setBackendURL(image.slice(1, )));
    });
  };

  useEffect(() => {
    getTags();
    getImage();
  }, []);

  return (
    <div className="home pages">
      <Navbar title="Home" profileImage={image} />
      <main className="home__main box box--white-text">
        <img src={image} alt="" className="img img--big" />
      </main>
    </div>
  );
};

export default Home;
