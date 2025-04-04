import "../../../assets/css/changeEmail.css";
import ProgressBubble from "../../topLayer/pageContentRouting/progressBubble";
import CodeVerificationField from "./CodeVerificationField";
import ChangeEmailContext from "../../../context/changeEmailContext";
import PageRoutingContext from "../../../context/pageRoutingContext";
import AuthContext from "../../../context/authContext";
import { tryCatchFetch, APIFetch, setBackendURL, setAuthorization } from "../../../utility/myapi";
import { useContext } from "react";

const CodeVerificationPage = () => {
  const { setIsSentEmailChange, toEmail } = useContext(ChangeEmailContext);
  const { incrementPageState } = useContext(PageRoutingContext);
  const { authTokens } = useContext(AuthContext);

  const sensorEmail = (email: string) => {
    const [emailName, domainName] = email.split("@");
    const sensorEmailNameArray = emailName.split("").map((value, index) => {
      if (index <= 2 || index >= emailName.length - 3) return value;
      return "*";
    });
    return sensorEmailNameArray.join("") + "@" + domainName;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, code: string) => {
    tryCatchFetch(async () => {
      await APIFetch({
        URL: setBackendURL("code-verification/verify"),
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: setAuthorization(authTokens.access) 
        },
        body: JSON.stringify({code_verification: code})
      });
      incrementPageState();
      setIsSentEmailChange(false);
    });
  };

  return (
    <div className="change-email-page d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column justify-content-center flex-grow-1 gap-4">
        <p className="fs-5">
          The verification code is sent to {sensorEmail(toEmail)}. Please enter
          your verification code here
        </p>
        <CodeVerificationField numDigit={4} onSubmit={handleSubmit} />
      </div>
      <ProgressBubble />
    </div>
  );
};

export default CodeVerificationPage;
