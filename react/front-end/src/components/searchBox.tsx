import "../assets/css/searchBox.css";
import searchIcon from "../assets/img/Search.png";
import cancelIcon from "../assets/img/cancel.png";

import Input from "./Input";

import { useState, useEffect } from "react";

interface SearchBoxParams {
  title: string;
  callback: (value: boolean) => void;
  query: any[];
  queryFunction: (searchQuery: string) => (value: any) => any;
  mapFunction: (value: any) => JSX.Element;
  findFunction: (value: any) => any;
  emptyFunction?: (query: string) => JSX.Element;
}

interface SearchElementParams {
  callback: () => void;
  children: JSX.Element | JSX.Element[];
}

const SearchBox = ({
  title,
  callback,
  query,
  queryFunction,
  mapFunction,
  findFunction,
  emptyFunction,
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

  const displaySearchElement = () => {
    if (typeof emptyFunction === "undefined") {
      return filterQuery().map(mapFunction);
    }

    return filterQuery().length === 0
      ? emptyFunction(searchQuery)
      : filterQuery().map(mapFunction);
  };

  useEffect(() => {
    console.log(query);
  }, [query])

  return (
    <div className="search-box d-flex gap--sm">
      <button className="my-button" onClick={() => callback(false)}>
        <img src={cancelIcon} alt={cancelIcon} className="img img--xs" />
      </button>
      <div className="content-box d-flex flex-grow-1 flex-column flex-center gap">
        <h2 className="my-header">{title}</h2>

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
          {displaySearchElement()}
        </div>
      </div>
    </div>
  );
};

export const SearchElement = ({ callback, children }: SearchElementParams) => {
  return (
    <button
      className="element my-button box--white-text d-flex"
      onClick={callback}
    >
      {children}
    </button>
  );
};

export const appendFunction = (
  value: any[],
  setValue: (value: any) => void
) => {
  return (appendValue: any) => setValue([...value, appendValue]);
};

export default SearchBox;
