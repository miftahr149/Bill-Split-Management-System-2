import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pages text-color-white d-flex flex-center flex-column gap">
      <div className="d-flex flex-center flex-column">
        <h1 className="my-header header--l">404</h1>
        <p className="my-text my-text--l">Pages Not Found</p>
      </div>
      <Link to="/" className="btn btn-success">Back to Home Page</Link>
    </div>
  );
};

export default NotFound;
