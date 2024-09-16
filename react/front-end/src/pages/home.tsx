import "../assets/css/home.css";
import smallPlusIcon from "../assets/img/plus-small.png";

import Navbar from "../components/navbar";
import { BillSplitParams, TagParams } from "../components/billSplitCard";
import BillSplitCard from "../components/billSplitCard";
import AuthContext from "../context/authContext";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
  getImage,
} from "../utility/myapi";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

interface TagElementParams {
  tag: TagParams;
  count: number;
}

interface TagsCounterParams {
  [tagName: string]: number;
}

interface TagsListParams {
  tags: TagParams[];
  tagsCounter: TagsCounterParams;
}

const TagElement = ({ tag, count }: TagElementParams) => {
  const { name } = tag;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const prop = name == "All" ? {} : { state: { filter: name } };
    navigate(location.pathname, prop);
  };

  return (
    <li className="tag-element d-flex flex-column">
      <button
        className="tag-element__btn d-flex my-button box--white-text"
        onClick={handleClick}
      >
        <div className="d-flex justify-content-center align-items-center">
          <p className="my-text my-text--bold my-text--align-center">{name}</p>
        </div>
        <p className="my-text tag-element__counter">{count}</p>
      </button>
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
      <Link
        to="create-bill-split"
        className="create-bill-split-button box--white-text d-flex flex-center"
      >
        <img src={smallPlusIcon} alt="plus" className="img img--sm plus-icon" />
        <p className="my-text my-text--bold my-text--align-center display-desktop">
          Proposed Bill Split
        </p>
      </Link>
    </div>
  );
};

const Home = () => {
  const [tags, setTags] = useState<TagParams[]>([]);
  const { authTokens, username } = useContext(AuthContext);
  const [image, setImage] = useState<string>("");
  const [billSplits, setBillSplits] = useState<BillSplitParams[]>();
  const [tagsCounter, setTagsCounter] = useState<TagsCounterParams>({});
  const location = useLocation();

  const setAvailableTags = (data: BillSplitParams[]) => {
    console.log("Calculating Available Tags");
    const tempTagsCounter: TagsCounterParams = { all: data.length };
    const availableTags: TagParams[] = [];

    data.forEach((element: BillSplitParams) => {
      element.tag.forEach((element: TagParams) => {
        if (!(element.name in tags)) {
          availableTags.push(element);
          tempTagsCounter[element.name] = 1;
          return;
        }

        tempTagsCounter[element.name]++;
      });
    });

    setTags(availableTags);
    setTagsCounter(tempTagsCounter);
  };

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

  const filterBillSplit = () => {
    if (location.state === null) return billSplits;
    return billSplits?.filter((value: BillSplitParams) => {
      for (const index in value.tag) {
        if (value.tag[index].name === location.state.filter) {
          return true;
        }
      }
      return false;
    });
  };

  useEffect(() => {
    getImage(setImage, authTokens, username);
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

            <div className="d-flex flex-column gap">
              {filterBillSplit()?.map((value: BillSplitParams) => (
                <BillSplitCard {...value} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
