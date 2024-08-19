import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

interface PrivateRouteParam {
  component: JSX.Element;
}

const PrivateRoute = ({ component: RouteComponent }: PrivateRouteParam) => {
  const { authTokens } = useContext(AuthContext);

  const authenticated = authTokens.access !== '' && authTokens.refresh !== '';
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return RouteComponent;
};

export default PrivateRoute;
