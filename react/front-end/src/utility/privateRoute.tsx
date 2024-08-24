import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

interface PrivateRouteParam {
  component: JSX.Element;
}

const PrivateRoute = ({ component: RouteComponent }: PrivateRouteParam) => {
  const {authTokens, updateToken, isUserValid } = useContext(AuthContext);

  // Checking whether both user's access and refresh token is none (a.k.a haven't sign up yet)
  if (authTokens.access === "" && authTokens.refresh === "") {
    return <Navigate to="/login" />;
  }

  if (!isUserValid) {
    updateToken();
    if (authTokens.access === "" && authTokens.refresh === "") {
      return <Navigate to="/login" />;
    }
  }

  return RouteComponent;
};

export default PrivateRoute;
