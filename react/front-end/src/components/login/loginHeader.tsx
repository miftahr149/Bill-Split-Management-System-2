import favicon from "../../assets/img/favicon.png"

interface LoginHeaderType {
  title: string;
}

const LoginHeader = ({ title }: LoginHeaderType) => {
  return (
    <div className="header-box d-flex box">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <img src={favicon} alt="" className="img img--round" />
      </div>
      <div className="text-box d-flex justify-content-center">
        <h1 className="my-header my-header--sm">
          Bill Split Management System
        </h1>
        <p className="my-text">{title}</p>
      </div>
    </div>
  );
};

export default LoginHeader;
