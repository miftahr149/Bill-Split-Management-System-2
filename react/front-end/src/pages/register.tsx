import "../assets/css/login.css";
import LoginHeader from "../components/login/loginHeader";
import LoginField from "../components/login/loginField";
import LoginErrorAlert from "../components/login/loginErrorAlert";
import AuthContext from "../context/authContext";

import { useState } from "react";
import { Link } from "react-router-dom";

const checkNumber = (str: string) => /^[0-9]$/.test(str);
const checkAlphabet = (str: string) => /^[a-zA-Z]$/.test(str);

const checkFirstCharNumber = (username: string) => checkNumber(username[0]);

const checkSpecialCharacter = (username: string) => {
  const specialChar = username
    .split("")
    .filter((ch) => !(checkNumber(ch) || checkAlphabet(ch)));
  return specialChar.length > 0;
};

const checkCapitalAlphabet = (password: string) => {
  const capitalAlphabet = password.split("").filter((ch) => /^[A-Z]$/.test(ch));
  return capitalAlphabet.length > 0;
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const checkUsername = () => {
    const isFirstCharNumber = checkFirstCharNumber(username);
    const isSpecialCharacter = checkSpecialCharacter(username);
    setIsUsernameValid(() => !isFirstCharNumber && !isSpecialCharacter);
  };

  const checkPassword = () => {
    const isCapitalAlphabet = checkCapitalAlphabet(password);
    const isSpecialCharacter = checkSpecialCharacter(password);
    const isNumber = checkNumber(password);
    setIsPasswordValid(
      () => isCapitalAlphabet && isNumber && !isSpecialCharacter
    );
  };

  const checkConfirmPassword = () => {
    setIsConfirmPasswordValid(() => password == confirmPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex pages login justify-content-center align-items-center">
      <div className="form d-flex flex-column">
        <LoginHeader title="Register Page" />
        {!isUsernameValid && (
          <LoginErrorAlert message="Username can't have number in the first character and Special Character (@, /, etc)" />
        )}

        {!isPasswordValid && (
          <LoginErrorAlert message="Password should have atleast number and capital letter" />
        )}

        {!isConfirmPasswordValid && (
          <LoginErrorAlert message="Confirm Password should be the same as password" />
        )}

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="body-box box d-flex flex-column"
        >
          <LoginField
            name="Username"
            type="text"
            callback={setUsername}
            onBlur={checkUsername}
          />

          <LoginField
            name="Password"
            type="password"
            callback={setPassword}
            onBlur={checkPassword}
          />

          <LoginField
            name="Confirm Password"
            type="password"
            callback={setConfirmPassword}
            onBlur={checkConfirmPassword}
          />

          <div className="button-box flex-grow-1">
            <div className="d-flex flex-center">
              <input
                type="submit"
                className="flex-grow-1 btn btn-success"
                value="Register"
              />
            </div>
            <div className="d-flex flex-center">
              <Link to="/login" className="my-text my-text--sm">
                Already have account? Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
