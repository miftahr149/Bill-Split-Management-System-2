import "../assets/css/billSplitBox.css"
import smallPlusIcon from "../assets/img/plus-small.png";
import BillSplitCard from "./billSplitCard";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BillSplitParams, TagParams } from "./billSplitCard";

interface BillSplitBoxParams {
  query: BillSplitParams[];
}

interface TagListParams {
  query: BillSplitParams[];
  callback: (value: TagParams) => void;
}

interface TagElementParams {
  tag: TagParams;
  count: number;
  callback: (value: TagParams) => void;
}

interface TagsCounterParams {
  [tagName: string]: number;
}

const TagElement = ({ tag, count, callback }: TagElementParams) => {
  const { name } = tag;
  
  
  const handleClick = () => {
    console.log(`set tagsFilter to ${name}`);
    callback(tag);
  }

  return (
    <li className="tag-element d-flex flex-column">
      <button
        className="button d-flex my-button text-color-white"
        onClick={handleClick}
      >
        <div className="d-flex justify-content-center align-items-center">
          <p className="my-text text-bold text-center">{name}</p>
        </div>
        <p className="counter my-text">{count}</p>
      </button>
    </li>
  );
};

const TagList = ({ query, callback }: TagListParams) => {
  const initTags = () => ([{ name: "All" }]);
  const initTagsCounter = () => ({ All: query.length });

  const [tags, setTags] = useState<TagParams[]>(initTags());
  const [tagsCounter, setTagsCounter] =
    useState<TagsCounterParams>(initTagsCounter());

  useEffect(() => {
    setTags(() => initTags())
    setTagsCounter(() => initTagsCounter())
    console.log(query);

    query.forEach(({ tag }) => {
      tag.forEach((value) => {
        if (tags.includes(value)) {
          setTagsCounter((previousState) => ({
            ...previousState,
            ...Object.fromEntries([
              [value.name, previousState[value.name] + 1],
            ]),
          }));
        } else {
          setTags((previousState) => [...previousState, value]);
          setTagsCounter((previousState) => ({
            ...previousState,
            ...Object.fromEntries([[value.name, 1]]),
          }));
        }
      });
    });
  }, [query]);

  return (
    <ul className="tags-list flex-grow-1 d-flex flex-column">
      {tags.map((tag: TagParams) => (
        <TagElement
          key={tag.name}
          tag={tag}
          count={tagsCounter[tag.name]}
          callback={callback}
        />
      ))}
    </ul>
  );
};

const BillSplitBox = ({ query }: BillSplitBoxParams) => {
  const [filterTags, setFilterTags] = useState<TagParams>({name: "All"});

  const filterBillSplit = () => {
    return filterTags.name === "All"
      ? query
      : query.filter((value) => value.tag.includes(filterTags));
  };

  const TagListCallback = (value: TagParams) => setFilterTags(value);

  return (
    <div className="bill-split-box flex-grow-1 gap--l">
      <div className="box box--bg-black d-flex flex-column gap">
        <h2 className="my-header text-color-primary-green">Tags</h2>
        <TagList query={query} callback={TagListCallback} />
      </div>
      <div className="bill-split-list box">
        <div className="header-box d-flex flex-center">
          <h2 className="my-header text-color-primary-green">Bill Split</h2>
          <Link
            to="create-bill-split"
            className="create-bill-split-button text-color-white d-flex flex-center btn btn-success"
          >
            <img
              src={smallPlusIcon}
              alt="plus"
              className="img img--sm plus-icon"
            />
            <p className="my-text text-bold text-center display-desktop">
              Proposed Bill Split
            </p>
          </Link>
        </div>

        <div className="d-flex flex-column gap">
          {filterBillSplit().map((value: BillSplitParams) => (
            <BillSplitCard {...value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillSplitBox;
