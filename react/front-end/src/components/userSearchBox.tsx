import SearchBox from "./searchBox";
import { SearchElement } from "./searchBox";
import { UserParams } from "./billSplitCard";
import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/myapi";
import AuthContext from "../context/authContext";

interface UserSearchBoxParams {
  callback: React.Dispatch<SetStateAction<boolean>>;
  users: UserParams[];
  setUsers: React.Dispatch<SetStateAction<UserParams[]>>;
}

const UserSearchBox = ({ callback, users, setUsers }: UserSearchBoxParams) => {
  const [userQuery, setUserQuery] = useState<UserParams[]>([]);
  const { authTokens } = useContext(AuthContext);

  const getUser = () => {
    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: setBackendURL("getUsers"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      });

      setUserQuery(data);
    });
  };

  const queryFunction = (searchQuery: string) => {
    return (value: UserParams) => {
      return value.username.toLowerCase().includes(searchQuery.toLowerCase());
    };
  };

  const findFunction = (value: UserParams) => {
    return users.find(
      (findValue: UserParams) => findValue.username === value.username
    );
  };

  const mapFunction = (value: UserParams) => {
    const [userImage, setUserImage] = useState("");

    const callback = () => {
      setUsers((previousState: UserParams[]) => [...previousState, value]);
    };

    useEffect(() => {
      tryCatchFetch(async () => {
        const { image } = await APIFetch({
          URL: setBackendURL("userImage/get"),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: setAuthorization(authTokens.access),
          },
          body: JSON.stringify({ username: value.username }),
        });
        setUserImage(image);
      });
    }, [value.username]);

    return (
      <SearchElement callback={callback}>
        <div className="d-flex">
          <img
            src={userImage}
            alt={userImage}
            className="img img--xs img--round"
          />
          <p className="my-text my-text--bold">{value.username}</p>
        </div>
      </SearchElement>
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SearchBox
      title="Add User"
      callback={callback}
      query={userQuery}
      mapFunction={mapFunction}
      findFunction={findFunction}
      queryFunction={queryFunction}
    />
  );
};

export default UserSearchBox;
