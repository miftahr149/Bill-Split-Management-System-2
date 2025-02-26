import PageRoutingContext from "../../../context/pageRoutingContext";
import { useContext } from "react";

interface PageRouteParams {
  value: Number;
  component: JSX.Element;
}

const PageRoute = ({ value, component }: PageRouteParams) => {
  const trigger = useContext(PageRoutingContext);
  return <>{value == trigger && component}</>;
};

export default PageRoute;
