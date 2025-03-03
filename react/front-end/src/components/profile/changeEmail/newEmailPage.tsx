import "../../../assets/css/changeEmail.css";
import ChangeEmailContext from "../../../context/changeEmailContext";
import PageRoutingContext from "../../../context/pageRoutingContext";
import Input from "../../Input";
import { useContext, useState } from "react";
import ProgressBubble from "../../pageContentRouting/progressBubble";

const NewEmailPage = () => {
  const [newEmail, setNewEmail] = useState("");
  const { setIsSentEmailChange } = useContext(ChangeEmailContext);
  const { incrementPageState } = useContext(PageRoutingContext);

  const checkValidEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(newEmail);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    incrementPageState();
    setIsSentEmailChange(true);
  };

  return (
    <div className="change-email-page d-flex flex-column flex-grow-1">
      <form
        className="d-flex flex-column justify-content-center flex-grow-1 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column">
          <label className="fs-2">New Email Address</label>
          <Input callback={setNewEmail} className="text-input my-text" />
        </div>
        <input
          type="submit"
          className="btn btn-success p-2 fs-4"
          value="Submit"
          disabled={!checkValidEmail()}
        />
      </form>
      <ProgressBubble />
    </div>
  );
};

export default NewEmailPage;
