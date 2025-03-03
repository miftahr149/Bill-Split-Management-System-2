import "../../../assets/css/changeEmail.css"
import ProgressBubble from "../../pageContentRouting/progressBubble";
import successImage from "../../../assets/img/success.png";

const SuccessChangeEmailPage = () => {
  return (
    <div className="change-email-page d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column flex-grow-1 gap-4 align-items-center">
        <img src={successImage} className="img img--l" />
        <p className="my-text fs-2 text-center px-4">
          Your current email has been successfully change to new email
        </p>
      </div>
      <ProgressBubble />
    </div>
  );
};

export default SuccessChangeEmailPage;
