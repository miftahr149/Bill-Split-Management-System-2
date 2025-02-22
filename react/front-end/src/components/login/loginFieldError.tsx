import { LoginFieldContext } from "../../context/loginFieldContext";
import { useContext, useEffect } from "react";

interface LoginFieldErrorParams {
  value: boolean;
  children: string;
}

const LoginFieldError = ({ value, children }: LoginFieldErrorParams) => {
  const { addError, removeError, isUserInput } = useContext(LoginFieldContext);

  useEffect(() => {
    if (value) addError(children);
    else removeError(children);
  }, [value, isUserInput]);

  return (
    <>
      {value && isUserInput && (
        <p className="error-message my-text my-text--sm">{children}</p>
      )}
    </>
  );
};

export default LoginFieldError;
