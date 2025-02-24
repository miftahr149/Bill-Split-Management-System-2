import "../assets/css/login.css";
import AuthHeader from "../components/authorization/authHeader";
import UsernameField from "../components/authorization/register/usernameField";
import PasswordField from "../components/authorization/register/passwordField";
import ButtonBox from "../components/authorization/register/buttonBox";
import ConfirmPasswordField from "../components/authorization/register/confirmPasswordField";

import { RegisterContextProvider } from "../context/registerContext";

/** Render a page for register new user */
const Register = () => {
  return (
    <RegisterContextProvider>
      <div className="d-flex pages login justify-content-center align-items-center">
        <div className="form d-flex flex-column">
          <AuthHeader title="Register Page" />
          <div className="body-box box d-flex flex-column">
            <UsernameField />
            <PasswordField />
            <ConfirmPasswordField />
            <ButtonBox />
          </div>
        </div>
      </div>
    </RegisterContextProvider>
  );
};

export default Register;
