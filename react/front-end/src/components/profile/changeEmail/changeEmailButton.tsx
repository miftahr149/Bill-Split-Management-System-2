import TopLayerButton from "../../topLayer/topLayerButton";
import PageRouting from "../../topLayer/pageContentRouting/pageRouting";
import PageRoute from "../../topLayer/pageContentRouting/pageRoute";
import NewEmailPage from "./newEmailPage";
import CodeVerificationPage from "./CodeVerificationPage";
import ChangeEmailContext from "../../../context/changeEmailContext";
import SuccessChangeEmailPage from "./SuccessChangeEmailPage";
import { ChangeEmailContextParams } from "../../../context/changeEmailContext";
import { useState, useEffect, useContext } from "react";
import { APIFetch, setAuthorization, setBackendURL, tryCatchFetch } from "../../../utility/myapi";
import AuthContext from "../../../context/authContext";

interface ChangeEmailButtonType {
  email: string;
}

interface IsSendType {
  is_send: boolean;
}

const ChangeEmailButton = ({email}: ChangeEmailButtonType) => {
  const [isSentEmailChange, setIsSentEmailChange] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const { authTokens } = useContext(AuthContext);

  const data: ChangeEmailContextParams = {
    email: email,
    toEmail: toEmail,
    setToEmail: (toEmail) => setToEmail(toEmail),
    setIsSentEmailChange: (value) => setIsSentEmailChange(() => value),
  };

  const setButtonAttribute = () => {
    const className = isSentEmailChange ? "btn btn-primary" : "btn btn-success";
    const buttonName = isSentEmailChange ? "Continue" : "Change Email";
    return {
      className: className,
      buttonName: buttonName,
    };
  };

  useEffect(() => {
    tryCatchFetch(async () => {
      const { is_send } : IsSendType = await APIFetch({
        URL: setBackendURL("code-verification/is-send"),
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: setAuthorization(authTokens.access)
        }
      })
      setIsSentEmailChange(is_send);
    })
  }, [])

  return (
    <ChangeEmailContext.Provider value={data}>
      <TopLayerButton {...setButtonAttribute()}>
        <PageRouting title="Change Email" initial={isSentEmailChange ? 1 : 0}>
          <PageRoute value={0} component={<NewEmailPage />} />
          <PageRoute value={1} component={<CodeVerificationPage />} />
          <PageRoute value={2} component={<SuccessChangeEmailPage />} />
        </PageRouting>
      </TopLayerButton>
    </ChangeEmailContext.Provider>
  );
};

export default ChangeEmailButton;
