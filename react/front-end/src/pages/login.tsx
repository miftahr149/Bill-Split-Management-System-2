import "../assets/css/login.css";
import favicon from "../assets/img/favicon.png";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import alertImage from "../assets/img/alert.png";

interface LoginFieldParams {
  name: string;
  type: string;
  callback: (value: string) => void;
}

interface LoginBodyParams {
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginField = ({ name, type, callback }: LoginFieldParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e.target.value);
  };

  return (
    <div className="field d-flex flex-column">
      <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
      <input
        type={type}
        name={name}
        placeholder={name}
        onChange={handleChange}
      />
    </div>
  );
};

const LoginHeader = () => {
  return (
    <div className="form__header d-flex box">
      <div className="header__left d-flex align-items-center justify-content-center">
        <img src={favicon} alt="" />
      </div>
      <div className="header__right d-flex justify-content-center">
        <h1>Bill Split Management System</h1>
        <p>Login Page</p>
      </div>
    </div>
  );
};

const LoginBody = ({
  setUsername,
  setPassword,
  handleSubmit,
}: LoginBodyParams) => {
  return (
    <form
      className="form__body box d-flex flex-column"
      method="POST"
      onSubmit={handleSubmit}
    >
      <LoginField name="username" type="text" callback={setUsername} />
      <LoginField name="password" type="password" callback={setPassword} />
      <div className="button-box d-flex justify-content-center align-items-end flex-grow-1">
        <input
          className="flex-grow-1 btn btn-success"
          type="submit"
          value="Login"
        />
      </div>
    </form>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction, authTokens, isUserValid } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authTokens.access !== "" && authTokens.refresh !== "") {
      console.log("navigating to home page");
      navigate("/");
    }
  }, [authTokens]);

  return (
    <div className="login pages d-flex justify-content-center align-items-center">
      <div className="login__form d-flex flex-column">
        <LoginHeader />

        {!isUserValid && (
          <div className="login-alert d-flex">
            <div className="login-alert__img-wrapper d-flex justify-content-center align-items-center">
              <img src={alertImage} alt="" />
            </div>
            <div className="login-alert__message d-flex flex-column justify-content-center">
              <p className="login-alert-warning">Warning!!</p>
              <p className="login-alert-message">
                Incorect Username or Password
              </p>
            </div>
          </div>
        )}

        <LoginBody
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={loginFunction({
            username: username,
            password: password,
          })}
        />
      </div>
    </div>
  );
};

export default Login;
