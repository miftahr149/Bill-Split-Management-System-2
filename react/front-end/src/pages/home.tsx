import "../assets/css/home.css";
import smallPlusIcon from "../assets/img/plus-small.png";

import Navbar from "../components/navbar";
import { BillSplitParams, TagParams } from "../components/billSplitCard";
import BillSplitCard from "../components/billSplitCard";

import { jwtDecode } from "jwt-decode";

import AuthContext from "../context/authContext";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
  getImage,
} from "../utility/myapi";

import { useEffect, useState, useContext } from "react";

interface TagElementParams {
  tag: TagParams;
  count: number;
}

interface TagsCounterParams {
  [tagName: string] : number;
}

interface TagsListParams {
  tags: TagParams[];
  tagsCounter: TagsCounterParams;
}


const TagElement = ({ tag, count }: TagElementParams) => {
  const { name } = tag;
  return (
    <li className="tag-element d-flex">
      <div className="d-flex justify-content-center align-items-center">
        <p className="my-text my-text--bold my-text--align-center">{name}</p>
      </div>
      <p className="my-text tag-element__counter">{count}</p>
    </li>
  );
};

const TagsList = ({ tags, tagsCounter }: TagsListParams) => {
  return (
    <ul className="tags-list flex-grow-1 d-flex flex-column">
      <TagElement tag={{ name: "All" }} count={tagsCounter.all} />
      {tags.map((tag: TagParams) => (
        <TagElement key={tag.name} tag={tag} count={tagsCounter[tag.name]} />
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

const Home = () => {
  const [tags, setTags] = useState<TagParams[]>([]);
  const { authTokens, username } = useContext(AuthContext);
  const [image, setImage] = useState<string>("");
  const [billSplits, setBillSplits] = useState<BillSplitParams[]>();
  const [tagsCounter, setTagsCounter] = useState<TagsCounterParams>({});

  const setAvailableTags = (data: BillSplitParams[]) => {
    console.log("Calculating Available Tags")
    const tempTagsCounter : TagsCounterParams = {all: data.length};
    const availableTags : TagParams[] = [];
    
    data.forEach((element : BillSplitParams) => {
      element.tag.forEach((element: TagParams) => {
        if (!(element.name in tags)) {
          availableTags.push(element);
          tempTagsCounter[element.name] = 1;
          return;
        }

        tempTagsCounter[element.name]++;
      })
    })

    setTags(availableTags);
    setTagsCounter(tempTagsCounter);
  }

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
      setAvailableTags(data);
    });
  };

  useEffect(() => {
    getImage(setImage, authTokens);
    getBillSplit();
  }, [authTokens]);

  return (
    <div className="home pages d-flex flex-column">
      <Navbar title="Home" />

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
            <TagsList tags={tags} tagsCounter={tagsCounter} />
          </div>
          <div className="bill-split-list box">
            <BillSplitListHeader />
            
            {billSplits?.map((element: BillSplitParams) => (
              <BillSplitCard {...element} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
