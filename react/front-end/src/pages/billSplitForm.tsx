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
import { ignoreFirstRender } from "../utility/utility";
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
const availableMode = ["create", "edit", "readonly", "reject"];
const readOnlyMode = ["readonly", "reject"];

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

  const notReadOnlyRestriction = (value: any) => {
    return readOnlyMode.includes(mode) ? undefined : value;
  };

  const handleClick = (
    handle: string,
    method: string,
    data?: { [name: string]: any }
  ) => {
    return () => {
      const postBillSplitData: { [name: string]: any } = {
        name: name,
        description: desc,
        tag: tags,
        user_amount: usersAmount,
        host: { username: username },
        ...data,
      };

      const errorCallback = () => {
        console.log("Failed to create bill-split");
      };

      tryCatchFetch(async () => {
        await APIFetch({
          URL: setBackendURL(`billSplit/${handle}`),
          method: method,
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
  };

  useEffect(() => {
    if (typeof billSplitData === "undefined") return;

    setName(billSplitData.name);
    setDesc(billSplitData.description);
    setTags(billSplitData.tag);
    setUsers(billSplitData.user_amount.map(({ user }) => user));
    setUsersAmount(billSplitData.user_amount);
  }, [billSplitData]);

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
              disabled={readOnlyMode.includes(mode)}
            />
          </Element>
          <Element
            title="Tags"
            buttonFunc={notReadOnlyRestriction(() => setIsAddTag(true))}
          >
            <div className="d-flex flex-wrap gap--sm">
              {tags.map((tag: TagParams) => (
                <TagElement
                  callback={notReadOnlyRestriction(setTags)}
                  tag={tag}
                  key={tag.name}
                />
              ))}

              {tags.length === 0 && (
                <p className="my-text text-color-dark">
                  you haven't add any tag yet
                </p>
              )}
            </div>
          </Element>
          <Element title="Description">
            <TextArea
              callback={setDesc}
              value={desc}
              className="text-input"
              disabled={readOnlyMode.includes(mode)}
            />
          </Element>
          <Element
            title="User"
            buttonFunc={notReadOnlyRestriction(() => setIsAddUser(true))}
          >
            <div className="d-flex flex-wrap gap--sm">
              {users.map((value: UserParams) => (
                <UserElement
                  user={value}
                  setUsers={notReadOnlyRestriction(setUsers)}
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
              notReadOnlyRestriction={notReadOnlyRestriction}
            />
          </Element>

          {mode === "create" && (
            <button
              className="btn btn-success btn-lg"
              onClick={handleClick("create", "POST")}
              {...disableButtonCreate()}
            >
              {role === "admin" ? "Create Bill Split" : "Proposed Bill Split"}
            </button>
          )}

          {mode === "edit" && (
            <button
              className="btn btn-success btn-lg"
              onClick={handleClick("edit", "PUT", { id: billSplitData?.id })}
              {...disableButtonCreate()}
            >
              Edit Proposed Bill Split
            </button>
          )}

          {mode === "readonly" && (
            <div className="d-flex flex-center gap--l">
              <button
                className="btn btn-success flex-grow-1"
                onClick={handleClick("accept", "PUT", {
                  id: billSplitData?.id,
                })}
              >
                Accept
              </button>
              <button
                className="btn btn-danger flex-grow-1"
                onClick={handleClick("reject", "PUT", {
                  id: billSplitData?.id,
                  status: billSplitData?.status,
                })}
              >
                Reject
              </button>
            </div>
          )}

          {mode === "reject" && (
            <button
              className="btn btn-danger"
              onClick={handleClick("reject", "delete", {
                id: billSplitData?.id,
              })}
            >
              Delete
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
  let { mode: modeForm, id: billSplitId } = useParams();
  const navigate = useNavigate();
  const { authTokens, username } = useContext(AuthContext);
  const [billSplitData, setBillSplitData] = useState<BillSplitParams>();
  const [mode, setMode] = useState<string>("create");

  const checkModeValid = () => {
    if (!availableMode.includes(mode)) navigate("/404");
  };

  const checkDataValid = () => {
    if (typeof billSplitId === "undefined") return;

    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: setBackendURL(
          mode === "reject" ? "billSplit/reject" : "billSplit/request"
        ),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as BillSplitParams[];

      const find = data.find(({ id }) => id === Number(billSplitId));
      if (typeof find === "undefined") {
        console.log("can't find the bill split data");
        return navigate("/404");
      }

      setBillSplitData(find);
    });
  };

  const checkValidUsername = (checkUsername: string, message?: string) => {
    if (username !== checkUsername) {
      if (typeof message !== "undefined") console.log(message);
      navigate("/404");
    }
  };

  useEffect(() => {
    if (typeof modeForm !== "undefined") setMode(modeForm);
  }, []);

  ignoreFirstRender(() => {
    checkModeValid();
    checkDataValid();
  }, [mode]);

  /* Action after there is update from billSplitData */
  useEffect(() => {
    console.log(billSplitData);
    if (typeof billSplitData === "undefined") return;
    if (mode === "edit")
      checkValidUsername(
        billSplitData?.host.username,
        "Username is not a host"
      );
    else if (mode === "readonly")
      checkValidUsername("admin", "Username is not an admin");
  }, [billSplitData]);

  return (
    <BillSplitFormContent mode={mode as string} billSplitData={billSplitData} />
  );
};

export default BillSplitForm;
