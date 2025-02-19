import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import { ignoreFirstRender } from "../../utility/utility";
import {
  checkNumberinString,
  checkSpecialCharacter,
  checkCapitalAlphabet,
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

  ignoreFirstRender(() => {
    setStatusField(checkPassword(), "password");
  }, [password])

  return (
    <LoginField
      name="password"
      type="password"
      callback={setPassword}
    >
      <LoginFieldError trigger={() => !checkPassword()}>
        Password should have atleast number and capital letter
      </LoginFieldError>
    </LoginField>
  );
};

export default PasswordField;