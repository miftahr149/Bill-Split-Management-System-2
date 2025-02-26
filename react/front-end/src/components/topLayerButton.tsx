import { useState } from "react";
import TopLayer from "./topLayer";

export type TopLayerCallbackType = (topLayerActive?: boolean) => void;

interface TopLayerButtonParams {
  title: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  onExit?: TopLayerCallbackType;
}

const TopLayerButton = ({
  children,
  className,
  title,
  onExit,
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
        {title}
      </button>
      <TopLayer value={isTopLayerActive}>
        <div className="top-layer-page d-flex">
          <div className="left">
            <button className="exit my-3 mx-4" onClick={handleExit}>
              <i className="bi bi-x fs-1" />
            </button>
          </div>
          <div className="right flex-grow-1 mt-4 d-flex flex-column">
            <h1 className="my-text fs-1 text-center">{title}</h1>
            {children}
          </div>
        </div>
      </TopLayer>
    </>
  );
};

export default TopLayerButton;
