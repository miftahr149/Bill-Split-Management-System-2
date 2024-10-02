import { useContext } from "react";
import AttributeElement from "./attributeElement";
import { UserParams } from "./billSplitCard";
import { UserProfileContext } from "../context/userProfileContext";

interface UserElement {
  user: UserParams;
  setUsers?: React.Dispatch<React.SetStateAction<UserParams[]>>;
}

const UserElement = ({ user, setUsers }: UserElement) => {
  const { getImage } = useContext(UserProfileContext);

  const handleClick = () => {
    if (typeof setUsers === "undefined") return;
    setUsers((previousState) => {
      return previousState.filter(({ username }) => username !== user.username);
    });
  };

  return (
    <AttributeElement
      callback={typeof setUsers === "undefined" ? undefined : handleClick}
    >
      <div className="d-flex gap">
        <img
          src={getImage(user.username)}
          alt="Profile Image"
          className="img img--xs img--round"
        />
        <p className="my-text text-bold">{user.username}</p>
      </div>
    </AttributeElement>
  );
};

export default UserElement;
