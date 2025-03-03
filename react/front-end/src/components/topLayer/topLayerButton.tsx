import "../../assets/css/topLayer.css"
import TopLayer from "./topLayer";
import TopLayerContext from "../../context/topLayerContext";
import { TopLayerContextParams } from "../../context/topLayerContext";
import { useState } from "react";

interface TopLayerButtonParams {
  buttonName: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const TopLayerButton = ({
  children,
  className,
  buttonName
}: TopLayerButtonParams) => {
  const [isTopLayerActive, setIsToplayerActive] = useState(false);
  const toggleTopLayer = () => setIsToplayerActive((prevState) => !prevState);

  const data: TopLayerContextParams = {
    toggleTopLayer: toggleTopLayer
  }

  return (
    <>
      <button onClick={toggleTopLayer} className={className}>
        {buttonName}
      </button>
      <TopLayerContext.Provider value={data}>
        <TopLayer value={isTopLayerActive}>
          {children}
        </TopLayer>
      </TopLayerContext.Provider>
    </>
  );
};

export default TopLayerButton;
