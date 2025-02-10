import alertImage from "../../assets/img/alert.png"

interface LoginErrorAlertType {
  message: string
}

const LoginErrorAlert = ({message} : LoginErrorAlertType) => {
  return (
    <div className="login-alert d-flex">
      <div className="d-flex justify-content-center align-items-center">
        <img src={alertImage} alt="" className="img img-small" />
      </div>
      <div className="d-flex flex-column justify-content-center">
        <p className="my-text">Warning!!</p>
        <p className="my-text text-bold">{message}</p>
      </div>
    </div>
  );
};

export default LoginErrorAlert