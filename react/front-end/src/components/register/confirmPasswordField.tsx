import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import { RegisterContext } from "../../context/registerContext";
import { useContext } from "react";

const ConfirmPasswordField = () => {
  const { confirmPassword, password, setConfirmPassword, setStatusField } = useContext(RegisterContext);

  const checkConfirmPassword = () => {
    return password == confirmPassword;
  };

  const handleCallback = (value: string, arrayError?: string[]) => {
    setConfirmPassword(value);
    setStatusField(arrayError?.length == 0, "confirm password");
  }

  return (
    <LoginField
      name="Confirm Password"
      type="password"
      callback={handleCallback}
    >
      <LoginFieldError value={!checkConfirmPassword()}>
        Confirm Password should be the same as password
      </LoginFieldError>
    </LoginField>
  );
};

export default ConfirmPasswordField;
