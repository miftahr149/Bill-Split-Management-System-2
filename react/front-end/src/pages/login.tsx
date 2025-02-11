import "../assets/css/login.css";

import AuthContext from "../context/authContext";
import LoginField from "../components/login/loginField";
import LoginErrorAlert from "../components/login/loginErrorAlert";
import LoginHeader from "../components/login/loginHeader";

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ignoreFirstRender } from "../utility/utility";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction, isUserValid } = useContext(AuthContext);
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
    if (isUserValid) navigate("/");
  }, [isUserValid]);

  return (
    <div className="login pages d-flex justify-content-center align-items-center">
      <div className="form d-flex flex-column">
        <LoginHeader title="Login Page" />
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
          <div className="button-box flex-grow-1">
            <div className="d-flex flex-center">
              <input
                className="flex-grow-1 btn btn-success"
                type="submit"
                value="Login"
              />
            </div>
            <div className="d-flex flex-center">
              <Link to="/register" className="my-text my-text--sm">
                Don't have any account yet? register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
