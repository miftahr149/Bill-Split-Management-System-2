import TopLayerButton from "../../topLayer/topLayerButton";
import { TopLayerCallbackType } from "../../topLayer/topLayerButton";
import PageRouting from "../../pageContentRouting/pageRouting";
import PageRoute from "../../pageContentRouting/pageRoute";
import NewEmailPage from "./newEmailPage";
import CodeVerificationPage from "./CodeVerificationPage";
import ChangeEmailContext from "../../../context/changeEmailContext";
import SuccessChangeEmailPage from "./SuccessChangeEmailPage";
import { ChangeEmailContextParams } from "../../../context/changeEmailContext";
import { useState, useEffect } from "react";

const ChangeEmailButton = () => {
  const [pageState, setPageState] = useState(0);
  const [isSentEmailChange, setIsSentEmailChange] = useState(false);

  const decrementPageState = () => {
    setPageState((prevState) => (prevState == 0 ? prevState : prevState - 1));
  };

  const incrementPageState = () => {
    setPageState((prevState) => prevState + 1);
  };

  const onExit: TopLayerCallbackType = () => {
    setPageState(() => (pageState === 1 ? 1 : 0));
  };

  const data: ChangeEmailContextParams = {
    incrementPageState: incrementPageState,
    decrementPageState: decrementPageState,
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
    console.log(pageState);
  }, [pageState]);

  return (
    <ChangeEmailContext.Provider value={data}>
      <TopLayerButton onExit={onExit} title="Change Email" {...setButtonAttribute()}>
        <PageRouting trigger={pageState}>
          <PageRoute value={0} component={<NewEmailPage />} />
          <PageRoute value={1} component={<CodeVerificationPage />} />
          <PageRoute value={2} component={<SuccessChangeEmailPage />} />
        </PageRouting>
      </TopLayerButton>
    </ChangeEmailContext.Provider>
  );
};

export default ChangeEmailButton;
