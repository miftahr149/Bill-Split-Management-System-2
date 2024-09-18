import "../assets/css/searchBox.css";
import searchIcon from "../assets/img/Search.png";
import cancelIcon from "../assets/img/cancel.png";

import Input from "./Input";

import { useState } from "react";

interface SearchBoxParams {
  title: string;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
  query: any[];
  queryFunction: (searchQuery: string) => (value: any) => any;
  mapFunction: (value: any) => JSX.Element;
  findFunction: (value: any) => any;
  emptyFunction?: (searchQuery: string) => JSX.Element;
}

interface SearchElementParams {
  callback: () => void;
  children: JSX.Element | JSX.Element[];
}

export const SearchElement = ({ callback, children }: SearchElementParams) => {
  return (
    <button
      className="element my-button text-color-white d-flex"
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

/**
 * Create a search box for
 *
 * @param {string} title the title of the search box
 * @param {React.Dispatch<React.SetStateAction<boolean>>} callback use for open/close the topLayer
 * @param {any[]} query the list of the available option to search
 * @param {(searchQuery: string) => (value: any) => any} queryFunction a filter function that wrapped by a function to pass the seachQuery variable into the function,
 * @param {(value: any) => JSX.Element} mapFunction a function that is used to render the query into a JSX element
 * @param {(value: any) => any} findFunction a function that is used to check whether the value in the query is already selected or not. 
 * @param {(searchQuery: string) => JSX.Element} emptyFunction a function that triggered when all the element in the query doesn't match with the user searchQuery
 */
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

  return (
    <div className="search-box d-flex gap--sm">
      <button className="my-button" onClick={() => callback(false)}>
        <img src={cancelIcon} alt={cancelIcon} className="img img--xs" />
      </button>
      <div className="content-box flex-grow-1 d-flex flex-column flex-center gap">
        <h2 className="my-header">{title}</h2>

        <div className="search d-flex gap">
          <button className="my-button">
            <img src={searchIcon} alt={searchIcon} className="img img--xs" />
          </button>
          <Input
            callback={setSearchQuery}
            className="search-input text-color-white flex-grow-1"
          />
        </div>

        <div className="query-list d-flex flex-column">
          {displaySearchElement()}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
