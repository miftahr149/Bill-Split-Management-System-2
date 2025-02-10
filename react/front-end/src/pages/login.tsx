import "../assets/css/login.css";
import favicon from "../assets/img/favicon.png";

import AuthContext from "../context/authContext";
import LoginField from "../components/login/loginField";
import LoginErrorAlert from "../components/login/loginErrorAlert";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ignoreFirstRender } from "../utility/utility";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction, authTokens } = useContext(AuthContext);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleInvalidLogin = () => {
    setIsInvalidLogin(() => true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFunction(
      { username: username, password: password },
      handleInvalidLogin
    );
  };

  ignoreFirstRender(() => {
    const { access, refresh } = authTokens;
    if (access && refresh) navigate("/");
  }, [authTokens]);

  return (
    <div className="login pages d-flex justify-content-center align-items-center">
      <div className="form d-flex flex-column">
        <div className="header-box d-flex box">
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <img src={favicon} alt="" className="img img--round" />
          </div>
          <div className="text-box d-flex justify-content-center">
            <h1 className="my-header my-header--sm">
              Bill Split Management System
            </h1>
            <p className="my-text">Login Page</p>
          </div>
        </div>

        {isInvalidLogin && (
          <LoginErrorAlert message="Incorrect username or password" />
        )}

        <form
          className="body-box box d-flex flex-column"
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
      </div>
    </div>
  );
};

export default Login;
