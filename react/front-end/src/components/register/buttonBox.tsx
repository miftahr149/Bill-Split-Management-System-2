import { RegisterContext } from "../../context/registerContext";
import AuthContext from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

const ButtonBox = () => {
  const { checkValidInformation, username, password } =
    useContext(RegisterContext);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccessRegister = () => navigate("/registersuccess");
  const handleSubmit = () => register(username, password, handleSuccessRegister);

  return (
    <div className="button-box flex-grow-1">
      <div className="d-flex flex-center">
        <button
          type="submit"
          className="flex-grow-1 btn btn-success"
          value="Register"
          onClick={handleSubmit}
          disabled={!checkValidInformation()}
        >
          Register
        </button>
      </div>
      <div className="d-flex flex-center">
        <Link to="/login" className="my-text my-text--sm">
          Already have account? Login
        </Link>
      </div>
    </div>
  );
};

export default ButtonBox;
