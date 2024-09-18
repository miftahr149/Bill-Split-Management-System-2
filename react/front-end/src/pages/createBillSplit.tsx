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

import { TagParams, UserAmountParams, UserParams } from "../components/billSplitCard";
import { useState } from "react";

interface ElementParams {
  title: string;
  children: JSX.Element | JSX.Element[];
  buttonFunc?: () => void;
}

const Element = ({ title, children, buttonFunc }: ElementParams) => {
  const addButtonFunc = () => {
    if (typeof buttonFunc === "undefined") return undefined;
    return (
      <button onClick={buttonFunc} className="my-button create-button btn btn-success">
        <img src={plusIcon} alt={plusIcon} className="img img--xs img--round" />
      </button>
    );
  };

  return (
    <div className="d-flex flex-column gap">
      <div className="d-flex gap--l">
        <h2 className="my-header my-header--color-green">{title}</h2>
        {addButtonFunc()}
      </div>
      {children}
    </div>
  );
};

const CreateBillSplit = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<TagParams[]>([]);
  const [users, setUsers] = useState<UserParams[]>([]);
  const [usersAmount, setUsersAmount] = useState<UserAmountParams[]>([]);

  const [isAddTag, setIsAddTag] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  return (
    <>
      <div className="pages d-flex flex-column">
        <Navbar title="Create Bill Split" />
        <main className="main box--white-text flex-grow-1 d-flex flex-column gap--l">
          <Element title="Bill Split Name">
            <Input callback={setName} className="text-input" />
          </Element>
          <Element title="Tags" buttonFunc={() => setIsAddTag(true)}>
            <div className="d-flex flex-wrap gap--sm">
              {tags.map((tag: TagParams) => (
                <TagElement callback={setTags} tag={tag} key={tag.name} />
              ))}
            </div>
          </Element>
          <Element title="Description">
            <TextArea callback={setDesc} className="text-input" />
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
            </div>
          </Element>
          <Element title="Bill Split Duration">
            <BillAmount users={users} setUsersAmount={setUsersAmount} usersAmount={usersAmount} />
          </Element>
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

export default CreateBillSplit;
