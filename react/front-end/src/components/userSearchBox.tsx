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
import { UserProfileContext } from "../context/userProfileContext";

interface UserSearchBoxParams {
  callback: React.Dispatch<SetStateAction<boolean>>;
  users: UserParams[];
  setUsers: React.Dispatch<SetStateAction<UserParams[]>>;
}

const UserSearchBox = ({ callback, users, setUsers }: UserSearchBoxParams) => {
  const { getImage } = useContext(UserProfileContext)
  const { authTokens, username } = useContext(AuthContext);
  const [userQuery, setUserQuery] = useState<UserParams[]>([]);

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
    if (value.username === username) return false;
    
    return users.find(
      (findValue: UserParams) => findValue.username === value.username
    );
  };

  const mapFunction = (value: UserParams) => {
    const handleClick = () => {
      setUsers((previousState: UserParams[]) => [...previousState, value]);
      callback(false);
    };

    return (
      <SearchElement callback={handleClick} key={value.username}>
        <div className="d-flex gap">
          <img
            src={getImage(value.username)}
            alt={getImage(value.username)}
            className="img img--xs img--round"
          />
          <p className="my-text text-bold">{value.username}</p>
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
