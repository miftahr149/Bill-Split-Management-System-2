import "../assets/css/createBillSplit.css";
import plusIcon from "../assets/img/plus-small.png";
import cancelIcon from "../assets/img/cancel.png";
import searchIcon from "../assets/img/Search.png";

import Navbar from "../components/navbar";
import Input from "../components/Input";
import TextArea from "../components/textarea";

import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/myapi";
import { TagParams } from "../components/billSplitCard";
import AuthContext from "../context/authContext";

import { useState, useEffect, useContext } from "react";

interface ElementParams {
  title: string;
  children: JSX.Element | JSX.Element[];
  addButton?: boolean;
  buttonFunc?: () => void;
}

interface BlackScreenParams {
  value: boolean;
  children: JSX.Element | JSX.Element[];
}

interface SearchBoxParams {
  callback: (value: boolean) => void;
  query: any[];
  queryFunction: (searchQuery: string) => (value: any) => any;
  mapFunction: (value: any) => JSX.Element;
  findFunction: (value: any) => any;
}

interface TagSearchBoxParams {
  callback: (value: boolean) => void;
  tags: TagParams[];
  setTags: (value: TagParams[]) => void;
}

interface SearchElementParams {
  callback: () => void;
  children: JSX.Element | JSX.Element[];
}

const Element = ({ title, children, addButton, buttonFunc }: ElementParams) => {
  return (
    <div className="d-flex flex-column gap">
      <div className="d-flex gap--sm">
        <h2 className="my-header my-header--color-green">{title}</h2>
        {addButton && (
          <button onClick={buttonFunc} className="my-button create-button">
            <img
              src={plusIcon}
              alt={plusIcon}
              className="img img--xs img--round"
            />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

const BlackScreen = ({ value, children }: BlackScreenParams) => {
  const setClass = () => {
    const defaultClass = "black-screen flex-center box--white-text";
    return value ? defaultClass : defaultClass + " none";
  };

  return <div className={setClass()}>{children}</div>;
};

const SearchBox = ({
  callback,
  query,
  queryFunction,
  mapFunction,
  findFunction,
}: SearchBoxParams) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterQuery = () => {
    const checkAvailable = (value: any) => {
      const result = findFunction(value);
      return result === undefined;
    };

    return searchQuery === ""
      ? query.filter(checkAvailable)
      : query.filter(checkAvailable).filter(queryFunction(searchQuery));
  };

  return (
    <div className="black-screen-box d-flex gap--sm">
      <button className="my-button" onClick={() => callback(false)}>
        <img src={cancelIcon} alt={cancelIcon} className="img img--xs" />
      </button>
      <div className="content-box d-flex flex-grow-1 flex-column flex-center gap">
        <h2 className="my-header">Add Tag</h2>

        <div className="search d-flex gap">
          <button className="my-button">
            <img src={searchIcon} alt={searchIcon} className="img img--xs" />
          </button>
          <Input
            callback={setSearchQuery}
            className="search-input box--white-text flex-grow-1"
          />
        </div>

        <div className="query-list d-flex flex-column gap">
          {filterQuery().map(mapFunction)}
        </div>
      </div>
    </div>
  );
};

const SearchElement = ({ callback, children }: SearchElementParams) => {
  return (
    <button
      className="element my-button box--white-text d-flex"
      onClick={callback}
    >
      {children}
    </button>
  );
};

const appendFunction = (value: any[], setValue: (value: any) => void) => {
  return (appendValue: any) => setValue([...value, appendValue]);
};

const TagSearchBox = ({ callback, tags, setTags }: TagSearchBoxParams) => {
  const [tagsQuery, setTagsQuery] = useState<TagParams[]>([]);

  const { authTokens } = useContext(AuthContext);

  const getTagsQuery = () => {
    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: setBackendURL("tag"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      });

      setTagsQuery(data);
    });
  };

  const findFunction = (value: TagParams) => {
    return tags.find((find: TagParams) => find.name === value.name);
  };

  const tagsQueryFunction = (searchQuery: string) => {
    return (value: TagParams) => value.name.includes(searchQuery);
  };

  const tagsQueryMapFunction = (value: TagParams) => {
    const handleClick = () => {
      appendFunction(tags, setTags)(value);
      console.log(tags);
      callback(false);
    };

    return (
      <SearchElement callback={handleClick}>
        <p className="my-text my-text--bold">{value.name}</p>
      </SearchElement>
    );
  };

  useEffect(() => {
    getTagsQuery();
  }, []);

  return (
    <SearchBox
      callback={callback}
      query={tagsQuery}
      queryFunction={tagsQueryFunction}
      mapFunction={tagsQueryMapFunction}
      findFunction={findFunction}
    />
  );
};

const CreateBillSplit = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<TagParams[]>([]);

  const [isAddTag, setIsAddTag] = useState(false);

  return (
    <>
      <div className="pages d-flex flex-column">
        <Navbar title="Create Bill Split" />
        <main className="main box--white-text flex-grow-1 d-flex flex-column gap--l">
          <Element title="Bill Split Name">
            <Input callback={setName} className="text-input" />
          </Element>
          <Element
            title="Tags"
            addButton={true}
            buttonFunc={() => setIsAddTag(true)}
          >
            <div></div>
          </Element>
          <Element title="Description">
            <TextArea callback={setDesc} className="text-input" />
          </Element>
        </main>
      </div>

      <BlackScreen value={isAddTag}>
        <TagSearchBox callback={setIsAddTag} tags={tags} setTags={setTags} />
      </BlackScreen>
    </>
  );
};

export default CreateBillSplit;
