import { LoginFieldContext } from "../../context/loginFieldContext";
import { useContext, useEffect, useState } from "react";

interface LoginFieldErrorParams {
  trigger: () => boolean;
  children: string;
}

const LoginFieldError = ({trigger, children}: LoginFieldErrorParams) => {
  const [isError, setIsError] = useState(trigger);
  const { incrementNumError, decrementNumError } = useContext(LoginFieldContext);

  useEffect(() => {
    setIsError((prevState) => {
      const triggerResult = trigger();
      if (prevState == triggerResult) return prevState;
      if (triggerResult) incrementNumError();
      else decrementNumError();
      return triggerResult;
    });
  })

  return (
    <>
      {isError && (
        <p className="error-message my-text my-text--sm">{children}</p>
      )}
    </>
  )
}

export default LoginFieldError;