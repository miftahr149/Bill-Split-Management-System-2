import ChangeEmailContext from "../../../context/changeEmailContext";
import Input from "../../Input";
import { useContext, useState } from "react";
import ProgressBubble from "./progressBubble";

const ChangeEmailPage = () => {
  const [newEmail, setNewEmail] = useState("");

  const { incrementPageState, setIsSentEmailChange } =
    useContext(ChangeEmailContext);

  const handleClick = () => {
    incrementPageState();
    setIsSentEmailChange(true);
  };

  return (
    <div className="d-flex flex-column m-5 px-5 flex-grow-1 gap-4 flex-grow-1">
      <div className="d-flex flex-column">
        <label className="fs-2">New Email Address</label>
        <Input callback={setNewEmail} className="text-input my-text" />
      </div>
      <button className="btn btn-success p-2 fs-4" onClick={handleClick}>
        Change Email Address
      </button>
      <ProgressBubble />
    </div>
  );
};

export default ChangeEmailPage;
