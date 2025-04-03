import TopLayerButton from "../../topLayer/topLayerButton";
import PageRouting from "../../topLayer/pageContentRouting/pageRouting";
import { OnExitCallback } from "../../../context/pageRoutingContext";
import PageRoute from "../../topLayer/pageContentRouting/pageRoute";
import NewEmailPage from "./newEmailPage";
import CodeVerificationPage from "./CodeVerificationPage";
import ChangeEmailContext from "../../../context/changeEmailContext";
import SuccessChangeEmailPage from "./SuccessChangeEmailPage";
import { ChangeEmailContextParams } from "../../../context/changeEmailContext";
import { useState } from "react";

interface ChangeEmailButtonType {
  email: string;
}

const ChangeEmailButton = ({email}: ChangeEmailButtonType) => {
  const [isSentEmailChange, setIsSentEmailChange] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const data: ChangeEmailContextParams = {
    email: email,
    newEmail: newEmail,
    setNewEmail: (newEmail) => setNewEmail(newEmail),
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
