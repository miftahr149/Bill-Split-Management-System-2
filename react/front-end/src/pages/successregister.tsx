import { Link } from "react-router-dom";
import successlogo from "../assets/img/success.png";

const SuccessRegister = () => {
  return (
    <div className="login pages d-flex flex-center">
      <div className="form d-flex success-register flex-column p-4">
        <div className="d-flex flex-center flex-column gap-2">
          <img src={successlogo} className="img" />
          <h2 className="my-header my-text-l">Hooray!!</h2>
          <p className="success-message my-text my-text-l text-center">
            Your account has been registered to the system
          </p>
        </div>
        <div className="flex-grow-1 button-box button-box--success-register d-flex flex-center ps-5 pe-5">
          <Link to="/" className="flex-grow-1 btn btn-success my-text-l">
            To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessRegister;
