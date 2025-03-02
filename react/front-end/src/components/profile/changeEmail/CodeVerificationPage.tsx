import ProgressBubble from "./progressBubble";
import CodeVerificationField from "./CodeVerificationField";

const dummyEmail = "AsepKesepian2@gmail.com";

const CodeVerificationPage = () => {
  const sensorEmail = (email: string) => {
    const [emailName, domainName] = email.split("@");
    const sensorEmailNameArray = emailName.split("").map((value, index) => {
      if (index <= 2 || index >= emailName.length - 3) return value;
      return "*";
    });
    return sensorEmailNameArray.join("") + "@" + domainName;
  };

  return (
    <div className="change-email-page d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column justify-content-center flex-grow-1 gap-4">
        <p className="fs-5">
          The verification code is sent to {sensorEmail(dummyEmail)}. Please
          enter your verification code here
        </p>
        <CodeVerificationField numDigit={4} />
      </div>
      <ProgressBubble />
    </div>
  );
};

export default CodeVerificationPage;
