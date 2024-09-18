import { useState, useEffect, useContext } from "react";
import AttributeElement from "./attributeElement";
import { UserParams } from "./billSplitCard";
import { getImage } from "../utility/myapi";
import AuthContext from "../context/authContext";

interface UserElement {
  user: UserParams;
  setUsers: React.Dispatch<React.SetStateAction<UserParams[]>>;
}

const UserElement = ({ user, setUsers }: UserElement) => {
  const [userImage, setUserImage] = useState("");
  const { authTokens } = useContext(AuthContext);

  const callback = () => {
    setUsers((previousState: UserParams[]) => {
      return previousState.filter(
        (value: UserParams) => value.username !== user.username
      );
    });
  };

  useEffect(() => {
    getImage(setUserImage, authTokens, user.username);
  }, []);

  return (
    <AttributeElement callback={callback}>
      <div className="d-flex gap">
        <img
          src={userImage}
          alt={userImage}
          className="img img--xs img--round"
        />
        <p className="my-text text-bold">{user.username}</p>
      </div>
    </AttributeElement>
  );
};

export default UserElement;