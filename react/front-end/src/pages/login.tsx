import "../assets/css/login.css";
import favicon from "../assets/img/favicon.png";
import { useState } from "react";

interface LoginFieldParam {
  name: string;
  type: string;
  callback: (value: string) => void;
}

const LoginField = ({ name, type, callback }: LoginFieldParam) => {
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
    <div className="form--header d-flex">
      <div className="header--left d-flex align-items-center justify-content-center">
        <img src={favicon} alt="" />
      </div>
      <div className="header--right d-flex">
        <h1>Bill Split Management System</h1>
        <p>Login Page</p>
      </div>
    </div>
  );
};

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  return (
    <form className="form--body d-flex flex-column" onSubmit={onSubmitFunction}>
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
  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="login--form box d-flex flex-column">
        <LoginHeader />
        <LoginBody />
      </div>
    </div>
  );
};

export default Login;
