import { AuthFieldContext } from "../../context/authFieldContext";
import { useContext, useEffect } from "react";

interface AuthFieldErrorParams {
  value: boolean;
  children: string;
}

/** Display error based on the value
 *  @param {AuthFieldErrorParams} value - true if detect error otherwise false
 *  @param {AuthFieldErrorParams} children - represent the message of the error
 */
const AuthFieldError = ({ value, children }: AuthFieldErrorParams) => {
  const { addError, removeError, isUserInput } = useContext(AuthFieldContext);

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

export default AuthFieldError;
