import "../assets/css/login.css";

import AuthContext from "../context/authContext";
import AuthField from "../components/authorization/authField";
import AuthErrorAlert from "../components/authorization/authErrorAlert";
import AuthHeader from "../components/authorization/authHeader";
import AuthButtonBox from "../components/authorization/authButtonBox";

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ignoreFirstRender } from "../utility/utility";

/** render a page to allow user access to the web application by login */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction, isUserValid } = useContext(AuthContext);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleInvalidLogin = () => {
    setIsInvalidLogin(() => true);
  };

  const handleSubmit = () => {
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
        <AuthHeader title="Login Page" />
        {isInvalidLogin && (
          <AuthErrorAlert message="Incorrect username or password" />
        )}
        <div className="body-box box d-flex flex-column">
          <AuthField name="username" type="text" callback={setUsername} />
          <AuthField name="password" type="password" callback={setPassword} />
          <AuthButtonBox msg="Login" onClick={handleSubmit}>
            <Link to="/authorization/register" className="my-text my-text--sm">
              Don't have account? register
            </Link>
          </AuthButtonBox>
        </div>
      </div>
    </div>
  );
};

export default Login;
