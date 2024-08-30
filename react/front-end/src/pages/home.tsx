import Navbar from "../components/navbar";
import "../assets/css/home.css";
import smallPlusIcon from "../assets/img/plus-small.png";

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

interface TagElementParams {
  tag: TagParams;
}

interface TagsListParams {
  tags: TagParams[];
}

const TagElement = ({ tag }: TagElementParams) => {
  const { name } = tag;
  return (
    <li className="tag-element d-flex">
      <div className="d-flex justify-content-center align-items-center">
        <p className="my-text my-text--bold my-text--align-center">{name}</p>
      </div>
      <p className="my-text tag-element__counter">0</p>
    </li>
  );
};

const TagsList = ({ tags }: TagsListParams) => {
  return (
    <ul className="tags-list flex-grow-1 d-flex flex-column">
      <TagElement tag={{ id: 4, name: "All" }} />
      {tags.map((tag: TagParams) => (
        <TagElement key={tag.id} tag={tag} />
      ))}
    </ul>
  );
};

const BillSplitListHeader = () => {
  return (
    <div className="bill-split-list__header d-flex flex-center">
      <h2 className="my-header my-header--color-green">Bill Split</h2>
      <button className="create-bill-split-button box--white-text d-flex flex-center">
        <img src={smallPlusIcon} alt="plus" className="img img--sm plus-icon" />
        <p className="my-text my-text--bold my-text--align-center display-desktop">
          Proposed Bill Split
        </p>
      </button>
    </div>
  );
};

const BillSplitCardTag = () => {
  return <p className="bill-split-card__tag my-text my-text--bold">Test</p>;
};

const BillSplitCard = () => {
  return (
    <div className="box box--bg-black">
      <div className="display-desktop">
        <div className="d-flex bill-split-card__header flex-center">
          <p className="my-text bill-split-card__name my-text--bold">
            Hello World
          </p>
          <div className="bill-split-card__tag-list d-flex flex-center">
            <BillSplitCardTag />
          </div>
        </div>

        <div className="bill-split-card__content d-flex align-items center">
          <p>Hi</p>
          <p>Hello</p>
        </div>
      </div>
      <div className="display-mobile"></div>
    </div>
  );
};

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
  }, [authTokens]);

  return (
    <div className="home pages d-flex flex-column">
      <Navbar title="Home" profileImage={image} />

      <main className="home__main box box--white-text flex-grow-1 d-flex flex-column">
        <div className="greeting">
          <div className="d-flex justify-content-center">
            <img src={image} alt="" className="img img--xl img--round" />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="my-text">Welcome Back!!</p>
            <h1 className="greeting__username my-header">{username}</h1>
          </div>
        </div>

        <div className="bill-split-box flex-grow-1">
          <div className="bill-split-tag box box--bg-black d-flex flex-column">
            <h2 className="my-header my-header--color-green">Tags</h2>
            <TagsList tags={tags} />
          </div>
          <div className="bill-split-list box">
            <BillSplitListHeader />
            <BillSplitCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
