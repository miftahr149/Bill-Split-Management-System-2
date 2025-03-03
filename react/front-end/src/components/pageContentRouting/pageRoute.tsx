import PageRoutingContext from "../../context/pageRoutingContext";
import { useContext } from "react";

interface PageRouteParams {
  value: Number;
  component: JSX.Element;
}

const PageRoute = ({ value, component }: PageRouteParams) => {
  const {pageState} = useContext(PageRoutingContext);
  return <>{value == pageState && component}</>;
};

export default PageRoute;
