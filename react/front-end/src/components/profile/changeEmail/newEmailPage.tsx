import "../../../assets/css/changeEmail.css";
import ChangeEmailContext from "../../../context/changeEmailContext";
import PageRoutingContext from "../../../context/pageRoutingContext";
import { useContext, useState } from "react";
import ProgressBubble from "../../topLayer/pageContentRouting/progressBubble";
import { APIFetch, setAuthorization, setBackendURL, tryCatchFetch } from "../../../utility/myapi";
import AuthContext from "../../../context/authContext";

const NewEmailPage = () => {
  const [newEmail, setNewEmail] = useState("");
  const { setIsSentEmailChange } = useContext(ChangeEmailContext);
  const { incrementPageState } = useContext(PageRoutingContext);
  const { authTokens } = useContext(AuthContext);

  const checkValidEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(newEmail);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    tryCatchFetch(async () => {
      console.log("Generating Code Verification");
      
      const data = await APIFetch({
        URL: setBackendURL("code-verification/generate"),
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access)
        },
        body: JSON.stringify({new_email: newEmail})
      })
      console.log(data);
      incrementPageState();
      setIsSentEmailChange(true);
    })
  };

  return (
    <div className="change-email-page d-flex flex-column flex-grow-1">
      <form
        className="d-flex flex-column justify-content-center flex-grow-1 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column">
          <label className="fs-2">New Email Address</label>
          <input
            type="email"
            onChange={(e) => setNewEmail(() => e.target.value)}
            className="text-input my-text"
          />
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
