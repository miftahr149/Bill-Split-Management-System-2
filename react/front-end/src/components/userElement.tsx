import { useContext } from "react";
import AttributeElement from "./attributeElement";
import { UserParams } from "./billSplitCard";
import { UserProfileContext } from "../context/userProfileContext";

interface UserElement {
  user: UserParams;
  setUsers: React.Dispatch<React.SetStateAction<UserParams[]>>;
}

const UserElement = ({ user, setUsers }: UserElement) => {
  const {getImage} = useContext(UserProfileContext)

  const callback = () => {
    setUsers((previousState: UserParams[]) => {
      return previousState.filter(
        (value: UserParams) => value.username !== user.username
      );
    });
  };

  return (
    <AttributeElement callback={callback}>
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