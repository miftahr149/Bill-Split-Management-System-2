import "../assets/css/tagList.css";
import { BillSplitParams } from "./billSplitCard";

import { useState, useEffect } from "react";
import { TagParams } from "./billSplitCard";

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
  };

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
  const initTags = () => [{ name: "All" }];
  const initTagsCounter = () => ({ All: query.length });

  const [tags, setTags] = useState<TagParams[]>(initTags());
  const [tagsCounter, setTagsCounter] = useState<TagsCounterParams>(
    initTagsCounter()
  );

  const setAvailableTags = () => {
    setTags(initTags);
    setTagsCounter(initTagsCounter);

    setTags((previousState) => {
      const tagListData = query.map((value) => value.tag).flat(1);
      const uniqueTagListData = new Set(tagListData);
      return [...previousState, ...Array.from(uniqueTagListData)];
    });

    setTagsCounter((previousState) => {
      const tagListData = query.map((value) => value.tag).flat(1);
      const tagCounter: TagsCounterParams = {};
      
      tagListData.forEach(({ name }) => {
        if (Object.keys(tagCounter).includes(name)) {
          tagCounter[name] += 1;
          return;
        }

        tagCounter[name] = 1;
      })

      return {...previousState, ...tagCounter};
    })
  };

  useEffect(() => {
    console.log("setting available tags");
    setAvailableTags();
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

export default TagList;
