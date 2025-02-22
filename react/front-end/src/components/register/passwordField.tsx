import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import {
  checkNumberinString,
  checkSpecialCharacter,
  checkCapitalAlphabet,
  isEmpty
} from "../../utility/registerUtility";
import { RegisterContext } from "../../context/registerContext";
import { useContext } from "react";

const PasswordField = () => {
  const { password, setPassword, setStatusField } = useContext(RegisterContext);

  const checkPassword = () => {
    const isCapitalAlphabet = checkCapitalAlphabet(password);
    const isNumber = checkNumberinString(password);
    const isSpecialCharacter = checkSpecialCharacter(password);
    return isCapitalAlphabet && isNumber && !isSpecialCharacter;
  };

  const handleCallback = (value: string, arrayError?: string[]) => {
    console.log(arrayError?.length);
    setPassword(value);
    setStatusField(arrayError?.length == 0, "password");
  }

  return (
    <LoginField
      name="password"
      type="password"
      callback={handleCallback}
    >
      <LoginFieldError value={!checkPassword()}>
        Password should have atleast number and capital letter
      </LoginFieldError>
      <LoginFieldError value={isEmpty(password)} >
        Please enter your password
      </LoginFieldError>
    </LoginField>
  );
};

export default PasswordField;