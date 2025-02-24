import AuthField from "../authField";
import AuthFieldError from "../authFieldError";

import {
  checkNumberinString,
  checkSpecialCharacter,
  checkCapitalAlphabet,
  isEmpty
} from "../../../utility/registerUtility";
import { RegisterContext } from "../../../context/registerContext";
import { useContext } from "react";

/** the extends of AuthField for providing password field in registration features */
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
    <AuthField
      name="password"
      type="password"
      callback={handleCallback}
    >
      <AuthFieldError value={!checkPassword()}>
        Password should have atleast number and capital letter
      </AuthFieldError>
      <AuthFieldError value={isEmpty(password)} >
        Please enter your password
      </AuthFieldError>
    </AuthField>
  );
};

export default PasswordField;