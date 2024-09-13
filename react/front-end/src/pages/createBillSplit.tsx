import "../assets/css/createBillSplit.css";
import plusIcon from "../assets/img/plus-small.png";
import cancelIcon from "../assets/img/cancel.png";
import searchIcon from "../assets/img/Search.png";

import Navbar from "../components/navbar";
import Input from "../components/Input";
import TextArea from "../components/textarea";

import { APIFetch, setBackendURL,  } from "../utility/myapi";

import { useState, useEffect } from "react";

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

interface BlackScreenBoxParams {
  callback: (value: boolean) => void;
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

const BlackScreenBox = ({ callback }: BlackScreenBoxParams) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableQuert, setAvailableQuery] = useState([]);

  useEffect(() => {
  })

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

        <div className="query-list">

        </div>
      </div>
    </div>
  );
};

const CreateBillSplit = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
        <BlackScreenBox callback={setIsAddTag} />
      </BlackScreen>
    </>
  );
};

export default CreateBillSplit;
