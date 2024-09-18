import SearchBox from "./searchBox";
import { SearchElement } from "./searchBox";
import { UserParams } from "./billSplitCard";
import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  setImageURL,
  tryCatchFetch,
} from "../utility/myapi";
import AuthContext from "../context/authContext";

interface UserSearchBoxParams {
  callback: React.Dispatch<SetStateAction<boolean>>;
  users: UserParams[];
  setUsers: React.Dispatch<SetStateAction<UserParams[]>>;
}

interface UsersImageParams {
  [username: string] : string;
}

const UserSearchBox = ({ callback, users, setUsers }: UserSearchBoxParams) => {
  const [userQuery, setUserQuery] = useState<UserParams[]>([]);
  const [usersImage, setUsersImage] = useState<UsersImageParams>({});
  const { authTokens, username } = useContext(AuthContext);

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
            src={usersImage[value.username]}
            alt={usersImage[value.username]}
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

  useEffect(() => {
    userQuery.forEach((user: UserParams) => {
      tryCatchFetch(async () => {
        const { image } = await APIFetch({
          URL: setBackendURL("userImage/get"),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: setAuthorization(authTokens.access),
          },
          body: JSON.stringify({ username: user.username }),
        });

        setUsersImage((previousState: UsersImageParams) => {
          previousState[user.username] = setImageURL(image);
          return previousState;
        });
      });
    });
  }, [userQuery])

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
