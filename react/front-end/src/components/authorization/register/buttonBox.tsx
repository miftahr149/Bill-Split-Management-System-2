import { RegisterContext } from "../../../context/registerContext";
import AuthContext from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthButtonBox from "../authButtonBox";

/** the extend AuthButtonBox for register features  */
const ButtonBox = () => {
  const { checkValidInformation, username, password } =
    useContext(RegisterContext);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccessRegister = () =>
    navigate("/authorization/registersuccess");
  const handleSubmit = () =>
    register({username, password}, handleSuccessRegister);

  return (
    <AuthButtonBox
      msg="Register"
      onClick={handleSubmit}
      disabled={!checkValidInformation()}
    >
      <Link to="/authorization/login" className="my-text my-text--sm">
        Already have account? login
      </Link>
    </AuthButtonBox>
  );
};

export default ButtonBox;
