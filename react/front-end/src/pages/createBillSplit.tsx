import "../assets/css/createBillSplit.css";
import plusIcon from "../assets/img/plus-small.png";


import Navbar from "../components/navbar";
import Input from "../components/Input";
import TextArea from "../components/textarea";
import TopLayer from "../components/topLayer";
import TagSearchBox from "../components/tagSearchBox";

import { TagParams } from "../components/billSplitCard";
import { useState } from "react";

interface ElementParams {
  title: string;
  children: JSX.Element | JSX.Element[];
  addButton?: boolean;
  buttonFunc?: () => void;
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

const VariableElement = () => {

}

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

      <TopLayer value={isAddTag}>
        <TagSearchBox callback={setIsAddTag} tags={tags} setTags={setTags} />
      </TopLayer>
    </>
  );
};

export default CreateBillSplit;
