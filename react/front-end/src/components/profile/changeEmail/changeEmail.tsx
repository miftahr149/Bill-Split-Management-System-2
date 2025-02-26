import TopLayerButton from "../../topLayerButton";
import ChangeEmailContext from "../../../context/changeEmailContext";
import { ChangeEmailContextParams } from "../../../context/changeEmailContext";
import { useState } from "react";

const ChangeEmailButton = () => {
  const [pageState, setPageState] = useState(0);
  const [isSentEmailChange, setIsSentEmailChange] = useState(false);

  const decrementPageState = () => {
    setPageState((prevState) => (prevState == 0 ? prevState : prevState - 1));
  }

  const incrementPageState = () => {
    setPageState((prevState) => prevState + 1);
  }

  const data: ChangeEmailContextParams = {
    incrementPageState: incrementPageState,
    decrementPageState: decrementPageState,
    setIsSentEmailChange: (value) => setIsSentEmailChange(() => value)
  }

  return (

    <TopLayerButton title="Change Email">
      <></>
    </TopLayerButton>
  );
};

export default ChangeEmailButton;
