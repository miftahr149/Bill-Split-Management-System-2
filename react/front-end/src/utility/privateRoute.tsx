import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

interface PrivateRouteParam {
  component: JSX.Element;
}

const PrivateRoute = ({ component: RouteComponent }: PrivateRouteParam) => {
  const { isUserValid } = useContext(AuthContext);

  // Checking whether both user's access and refresh token is none (a.k.a haven't sign up yet)

  if (!isUserValid) {
    return <Navigate to="/authorization/login/" />;
  }

  return RouteComponent;
};

export default PrivateRoute;
