import "../assets/css/billSplitBox.css"
import smallPlusIcon from "../assets/img/plus-small.png";
import BillSplitCard from "./billSplitCard";
import TagList from "./tagList";

import { BillSplitParams, TagParams } from "./billSplitCard";

import { Link } from "react-router-dom";
import { useState } from "react";

interface BillSplitBoxParams {
  query: BillSplitParams[];
}

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
