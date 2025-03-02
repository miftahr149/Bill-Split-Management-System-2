import TopLayerButton from "../../topLayerButton";
import { TopLayerCallbackType } from "../../topLayerButton";
import PageRouting from "./pageRouting";
import PageRoute from "./pageRoute";
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
  }

  const incrementPageState = () => {
    setPageState((prevState) => prevState + 1);
  }

  const onExit: TopLayerCallbackType = () => {
    setPageState(() => 0);
  }

  const data: ChangeEmailContextParams = {
    incrementPageState: incrementPageState,
    decrementPageState: decrementPageState,
    setIsSentEmailChange: (value) => setIsSentEmailChange(() => value)
  }

  useEffect(() => {
    console.log(pageState);
  }, [pageState])

  return (
    <ChangeEmailContext.Provider value={data}>
      <TopLayerButton title="Change Email" onExit={onExit}>
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
