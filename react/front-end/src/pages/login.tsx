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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction, authTokens, isUserValid } = useContext(AuthContext);
  const [isAlreadySubmit, setIsAlreadySubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsAlreadySubmit(true);
    loginFunction({ username: username, password: password })(e);
  };

  useEffect(() => {
    if (isUserValid) {
      console.log("navigating to home page");
      navigate("/");
    }
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

        {!isUserValid && isAlreadySubmit && (
          <div className="login-alert d-flex">
            <div className="d-flex justify-content-center align-items-center">
              <img src={alertImage} alt="" className="img img-small" />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <p className="my-text">Warning!!</p>
              <p className="my-text my-text--bold">
                Incorect Username or Password
              </p>
            </div>
          </div>
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
