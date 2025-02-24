import AuthField from "../authField";
import AuthFieldError from "../authFieldError";

import { RegisterContext } from "../../../context/registerContext";
import { useContext } from "react";

/** the extends of AuthField for providing Confirm Password field in registration features */
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
    <AuthField
      name="Confirm Password"
      type="password"
      callback={handleCallback}
    >
      <AuthFieldError value={!checkConfirmPassword()}>
        Confirm Password should be the same as password
      </AuthFieldError>
    </AuthField>
  );
};

export default ConfirmPasswordField;
