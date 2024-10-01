import "../assets/css/createBillSplit.css";
import plusIcon from "../assets/img/plus-small.png";

import Navbar from "../components/navbar";
import Input from "../components/Input";
import TextArea from "../components/textarea";
import TopLayer from "../components/topLayer";

import TagSearchBox from "../components/tagSearchBox";
import UserSearchBox from "../components/userSearchBox";

import TagElement from "../components/tagElement";
import UserElement from "../components/userElement";

import BillAmount from "../components/billAmount";

import {
  BillSplitParams,
  TagParams,
  UserAmountParams,
  UserParams,
} from "../components/billSplitCard";
import { useState, useContext, useEffect } from "react";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/myapi";
import AuthContext from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

interface ElementParams {
  title: string;
  children: JSX.Element | JSX.Element[];
  buttonFunc?: () => void;
}

interface BillSplitFormContentParams {
  billSplitData?: BillSplitParams;
  mode: string;
}

/* To Store Available mode in this page */
const availableMode = ["create", "edit", "readonly"];

const Element = ({ title, children, buttonFunc }: ElementParams) => {
  const addButtonFunc = () => {
    if (typeof buttonFunc === "undefined") return undefined;
    return (
      <button
        onClick={buttonFunc}
        className="my-button create-button btn btn-success"
      >
        <img src={plusIcon} alt={plusIcon} className="img img--xs img--round" />
      </button>
    );
  };

  return (
    <div className="d-flex flex-column gap">
      <div className="d-flex gap--l">
        <h2 className="my-header text-color-primary-green">{title}</h2>
        {addButtonFunc()}
      </div>
      {children}
    </div>
  );
};

const BillSplitFormContent = ({
  billSplitData,
  mode,
}: BillSplitFormContentParams) => {
  const navigate = useNavigate();
  const { authTokens, username, role } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<TagParams[]>([]);
  const [users, setUsers] = useState<UserParams[]>([]);

  const [usersAmount, setUsersAmount] = useState<UserAmountParams[]>([]);

  const [isAddTag, setIsAddTag] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  const disableButtonCreate = () => {
    const isNameEmpty = name === "";
    const isUsersEmpty = users.length === 0;

    const usersAmountZero = usersAmount.filter((value) => value.amount === 0);
    const isUsersAmountEmpty = usersAmountZero.length !== 0;

    return {
      disabled: isNameEmpty || isUsersEmpty || isUsersAmountEmpty,
    };
  };

  const handleClick = () => {
    const postBillSplitData: {[name: string]: any} = {
      name: name,
      description: desc,
      tag: tags,
      user_amount: usersAmount,
      host: { username: username },
    };

    if (mode === "edit") {
      postBillSplitData['id'] = billSplitData?.id;
    }

    console.log(postBillSplitData)

    const errorCallback = () => {
      console.log("Failed to create bill-split");
    };

    tryCatchFetch(async () => {
      await APIFetch({
        URL: setBackendURL("billSplit/user"),
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
        body: JSON.stringify(postBillSplitData),
        errorCallback: errorCallback,
      });

      console.log("successfully create bill-split");
      navigate("/");
    });
  };

  const setButtonName = () => {
    if (mode === "edit") return "Edit Proposed Bill Split";

    /* the mode is active */
    return role === "admin" ? "Create Bill Split" : "Proposed Bill Split";
  };

  useEffect(() => {
    console.log(billSplitData);
    if (typeof billSplitData === "undefined") return;

    setName(billSplitData.name);
    setDesc(billSplitData.description);
    setTags(billSplitData.tag);
    setUsers(billSplitData.user_amount.map(({ user }) => user));
    setUsersAmount(billSplitData.user_amount);
  }, [billSplitData]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <>
      <div className="pages d-flex flex-column">
        <Navbar title="Create Bill Split" />
        <main className="main text-color-white flex-grow-1 d-flex flex-column gap--l">
          <Element title="Bill Split Name">
            <Input
              value={name}
              callback={setName}
              className="text-input my-text--l"
            />
          </Element>
          <Element title="Tags" buttonFunc={() => setIsAddTag(true)}>
            <div className="d-flex flex-wrap gap--sm">
              {tags.map((tag: TagParams) => (
                <TagElement callback={setTags} tag={tag} key={tag.name} />
              ))}

              {tags.length === 0 && (
                <p className="my-text text-color-dark">
                  you haven't add any tag yet
                </p>
              )}
            </div>
          </Element>
          <Element title="Description">
            <TextArea callback={setDesc} value={desc} className="text-input" />
          </Element>
          <Element title="User" buttonFunc={() => setIsAddUser(true)}>
            <div className="d-flex flex-wrap gap--sm">
              {users.map((value: UserParams) => (
                <UserElement
                  user={value}
                  setUsers={setUsers}
                  key={value.username}
                />
              ))}

              {users.length === 0 && (
                <p className="my-text text-color-dark">
                  you haven't add any user yet
                </p>
              )}
            </div>
          </Element>
          <Element title="Bill Split Amount">
            <BillAmount
              users={users}
              setUsersAmount={setUsersAmount}
              usersAmount={usersAmount}
            />
          </Element>

          {mode !== "readonly" && (
            <button
              className="btn btn-success btn-lg"
              onClick={handleClick}
              {...disableButtonCreate()}
            >
              {setButtonName()}
            </button>
          )}
        </main>
      </div>

      <TopLayer value={isAddTag}>
        <TagSearchBox callback={setIsAddTag} tags={tags} setTags={setTags} />
      </TopLayer>

      <TopLayer value={isAddUser}>
        <UserSearchBox
          callback={setIsAddUser}
          users={users}
          setUsers={setUsers}
        />
      </TopLayer>
    </>
  );
};

const BillSplitForm = () => {
  let { mode, id: billSplitId } = useParams();
  const navigate = useNavigate();
  const { authTokens, username } = useContext(AuthContext);
  const [billSplitData, setBillSplitData] = useState<BillSplitParams>();

  const checkModeValid = () => {
    mode = typeof mode === "undefined" ? "create" : mode;
    if (!availableMode.includes(mode)) navigate("/404");
  };

  const checkDataValid = () => {
    if (typeof billSplitId === "undefined") return;

    console.log(billSplitId);
    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: setBackendURL("billSplit/request"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as BillSplitParams[];
      console.log(data);

      const find = data.find(({ id }) => id === Number(billSplitId));
      if (typeof find === "undefined") {
        return navigate("/404");
      }

      setBillSplitData(find);
    });
  };

  const checkHostValid = () => {
    if (billSplitData?.host.username !== username) navigate("/404");
  }

  useEffect(() => {
    checkModeValid();
    checkDataValid();
  }, []);

  /* Action after there is update from billSplitData */
  useEffect(() => {
    if (typeof billSplitData === "undefined") return;
    checkHostValid();
  }, [billSplitData]);

  return (
    <BillSplitFormContent mode={mode as string} billSplitData={billSplitData} />
  );
};

export default BillSplitForm;
