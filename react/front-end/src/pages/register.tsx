import "../assets/css/login.css";
import LoginHeader from "../components/login/loginHeader";
import LoginField from "../components/login/loginField";
import LoginErrorAlert from "../components/login/loginErrorAlert";
import AuthContext from "../context/authContext";

import { ignoreFirstRender } from "../utility/utility";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const checkNumber = (ch: string) => /^[0-9]$/.test(ch);
const checkAlphabet = (ch: string) => /^[a-zA-Z]$/.test(ch);

const checkFirstCharNumber = (username: string) => checkNumber(username[0]);

const checkSpecialCharacter = (username: string) => {
  const specialChar = username
    .split("")
    .filter((ch) => !(checkNumber(ch) || checkAlphabet(ch)));
  return specialChar.length > 0;
};

const checkNumberinString = (str: string) => {
  const number = str.split('').filter((ch) => checkNumber(ch));
  return number.length > 0;
}

const checkCapitalAlphabet = (password: string) => {
  const capitalAlphabet = password.split("").filter((ch) => /^[A-Z]$/.test(ch));
  console.log(capitalAlphabet);
  return capitalAlphabet.length > 0;
};

const isEmpty = (str: string) => {
  return str.trim().length === 0;
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const isValidInformation = () => {
    const validInformation = isUsernameValid && isPasswordValid && isConfirmPasswordValid;
    const emptyInformation = isEmpty(username) || isEmpty(password) || isEmpty(confirmPassword);
    return validInformation && !emptyInformation;
  };

  const checkUsername = () => {
    const isFirstCharNumber = checkFirstCharNumber(username);
    const isSpecialCharacter = checkSpecialCharacter(username);
    setIsUsernameValid(() => !isFirstCharNumber && !isSpecialCharacter);
    setIsUsernameEmpty(() => username == "")
  };

  const checkPassword = () => {
    const isCapitalAlphabet = checkCapitalAlphabet(password);
    const isNumber = checkNumberinString(password);
    const isSpecialCharacter = checkSpecialCharacter(password);

    console.log(isCapitalAlphabet);
    console.log(isSpecialCharacter);
    console.log(isNumber);

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

  ignoreFirstRender(() => {
    checkUsername();
  }, [username])

  ignoreFirstRender(() => {
    checkPassword();
  }, [password]);

  ignoreFirstRender(() => {
    checkConfirmPassword();
  }, [confirmPassword]);

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

        {isUsernameEmpty && (
          <LoginErrorAlert message="Username is empty, please fill in the username field" />
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
          />

          <LoginField
            name="Password"
            type="password"
            callback={setPassword}
          />

          <LoginField
            name="Confirm Password"
            type="password"
            callback={setConfirmPassword}
          />

          <div className="button-box flex-grow-1">
            <div className="d-flex flex-center">
              <input
                type="submit"
                className="flex-grow-1 btn btn-success"
                value="Register"
                disabled={!isValidInformation()}
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
