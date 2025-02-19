import "../assets/css/login.css";
import LoginHeader from "../components/login/loginHeader";
import UsernameField from "../components/register/usernameField";
import PasswordField from "../components/register/passwordField";
import ButtonBox from "../components/register/buttonBox";
import ConfirmPasswordField from "../components/register/confirmPasswordField";

import { RegisterContextProvider } from "../context/registerContext";

const Register2 = () => {

  return (
    <RegisterContextProvider>
      <div className="d-flex pages login justify-content-center align-items-center">
        <div className="form d-flex flex-column">
          <LoginHeader title="Register Page" />
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

export default Register2;
