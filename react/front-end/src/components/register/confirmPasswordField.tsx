import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import { ignoreFirstRender } from "../../utility/utility";
import { RegisterContext } from "../../context/registerContext";
import { useContext } from "react";

const ConfirmPasswordField = () => {
  const { confirmPassword, password, setConfirmPassword, setStatusField } = useContext(RegisterContext);

  const checkConfirmPassword = () => {
    return password == confirmPassword;
  };

  ignoreFirstRender(() => {
    setStatusField(checkConfirmPassword(), "confirm password");
  }, [confirmPassword]);

  return (
    <LoginField
      name="Confirm Password"
      type="password"
      callback={setConfirmPassword}
    >
      <LoginFieldError trigger={() => !checkConfirmPassword()}>
        Confirm Password should be the same as password
      </LoginFieldError>
    </LoginField>
  );
};

export default ConfirmPasswordField;
