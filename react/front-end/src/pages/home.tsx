import Navbar from "../components/navbar";
import "../assets/css/home.css";

import AuthContext from "../context/authContext";
import { useEffect, useState, useContext } from "react";

interface TagParams {
  id: number;
  name: string;
}

const Home = () => {
  const [tags, setTags] = useState<TagParams[]>([]); 
  const { authTokens } = useContext(AuthContext);
  
  const getTags = async () => {
    console.log("Fetching Tags From the Backend")
    const URL = "http://127.0.0.1:8000/api/tag";
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });

    const data = await response.json();
    setTags(data);
    console.log("Successfuly Fetching Tags")
  };

  const getImage = async () => {
    console.log("Fetching User's Photo Profile From the Backend")
    const URL = "http://127.0.0.1:8000/api/userImage";
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      }
    })

    const data = await response.json();
    console.log(data);
  }
  
  useEffect(() => {
    getTags();
    getImage();
  }, []);
  

  return (
    <div className="home pages">
      <Navbar title="Home" />
      <main className="home__main box box--white-text">
        {tags.map((tag:TagParams) => {
          return <p key={tag.id}>{tag.name}</p>
        })}
      </main>
    </div>
  );
};

export default Home;
