import "../assets/css/login.css";
import LoginHeader from "../components/login/loginHeader";
import LoginField from "../components/login/loginField";
import AuthContext from "../context/authContext";

import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="d-flex pages login justify-content-center align-items-center">
      <div className="form d-flex flex-column">
        <LoginHeader title="Register Page" />
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="body-box box d-flex flex-column"
        >
          <LoginField name="Username" type="text" callback={setUsername} />
          <LoginField name="Password" type="password" callback={setUsername} />
          <LoginField
            name="Confirm Password"
            type="password"
            callback={setUsername}
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
