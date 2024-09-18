import AuthContext from "../context/authContext";
import SearchBox from "../components/searchBox";
import { appendFunction, SearchElement } from "../components/searchBox";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/myapi";
import { TagParams } from "./billSplitCard";
import { useState, useContext, useEffect } from "react";

interface TagSearchBoxParams {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
  tags: TagParams[];
  setTags: React.Dispatch<React.SetStateAction<TagParams[]>>;
}

const TagSearchBox = ({ callback, tags, setTags }: TagSearchBoxParams) => {
  const [tagsQuery, setTagsQuery] = useState<TagParams[]>([]);
  const { authTokens } = useContext(AuthContext);

  const appendTags = appendFunction(tags, setTags);

  const getTags = () => {
    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: setBackendURL("tag"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      });

      setTagsQuery(data);
    });
  };

  const findFunction = (value: TagParams) => {
    return tags.find((find: TagParams) => find.name === value.name);
  };

  const queryFunction = (searchQuery: string) => {
    return (value: TagParams) =>
      value.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  };

  const mapFunction = (value: TagParams) => {
    const handleClick = () => {
      appendTags(value);
      callback(false);
    };

    return (
      <SearchElement callback={handleClick} key={value.name}>
        <p className="my-text text-bold">{value.name}</p>
      </SearchElement>
    );
  };

  const emptyFunction = (searchQuery: string) => {
    const handleClick = () => {
      tryCatchFetch(async () => {
        await APIFetch({
          URL: setBackendURL("tag"),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: setAuthorization(authTokens.access),
          },
          body: JSON.stringify({ name: searchQuery }),
        });
      });

      setTagsQuery((previousTagsQuery: TagParams[]) => {
        return [...previousTagsQuery, {name: searchQuery}]
      });
      appendTags({name: searchQuery});
      callback(false);
    };

    return (
      <SearchElement callback={handleClick} key={searchQuery}>
        <p className="my-text text-bold">
          {`Create new tag "${searchQuery}"`}
        </p>
      </SearchElement>
    );
  };

  useEffect(() => {
    console.log("getting tags from backend");
    getTags();
  }, []);

  return (
    <>
      <SearchBox
        title="Add Tag"
        callback={callback}
        query={tagsQuery}
        queryFunction={queryFunction}
        mapFunction={mapFunction}
        findFunction={findFunction}
        emptyFunction={emptyFunction}
      />
    </>
  );
};

export default TagSearchBox;
