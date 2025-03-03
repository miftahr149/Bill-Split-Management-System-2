import "../../../assets/css/topLayer.css"
import PageRoutingContext from "../../../context/pageRoutingContext";
import TopLayerContext from "../../../context/topLayerContext";
import { useContext } from "react";

interface PageRouteParams {
  value: Number;
  component: JSX.Element;
}

const PageRoute = ({ value, component }: PageRouteParams) => {
  const { pageState, onExit, changePageState, title } = useContext(PageRoutingContext);
  const { toggleTopLayer } = useContext(TopLayerContext);

  const handleExit = () => {
    toggleTopLayer();
    onExit?.({changePageState: changePageState, pageState: pageState});
  }

  return (
    <>
      {value == pageState && (
        <div className="top-layer-page d-flex flex-column">
          <div className="header d-flex">
            <button className="exit my-3 mx-4" onClick={handleExit}>
              <i className="bi bi-x fs-2" />
            </button>
            <div className="d-flex align-items-center flex-grow-1">
              <h1 className="my-text fs-1 text-center flex-grow-1">{title}</h1>
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1">{component}</div>
        </div>
      )}
    </>
  );
};

export default PageRoute;
