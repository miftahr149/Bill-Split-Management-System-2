import "../../assets/css/topLayerButton.css"
import { useState } from "react";
import TopLayer from "./topLayer";

export type TopLayerCallbackType = (topLayerActive?: boolean) => void;

interface TopLayerButtonParams {
  title: string;
  buttonName: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  onExit?: TopLayerCallbackType;
}

const TopLayerButton = ({
  children,
  className,
  title,
  onExit,
  buttonName
}: TopLayerButtonParams) => {
  const [isTopLayerActive, setIsToplayerActive] = useState(false);
  const toggleTopLayer = () => setIsToplayerActive((prevState) => !prevState);

  const handleExit = () => {
    toggleTopLayer();
    onExit?.();
  };

  return (
    <>
      <button onClick={toggleTopLayer} className={className}>
        {buttonName}
      </button>
      <TopLayer value={isTopLayerActive}>
        <div className="top-layer-page d-flex flex-column">
          <div className="header d-flex">
            <button className="exit my-3 mx-4" onClick={handleExit}>
              <i className="bi bi-x fs-2" />
            </button>
            <div className="d-flex align-items-center flex-grow-1">
              <h1 className="my-text fs-1 text-center flex-grow-1">{title}</h1>
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1">{children}</div>
        </div>
      </TopLayer>
    </>
  );
};

export default TopLayerButton;
