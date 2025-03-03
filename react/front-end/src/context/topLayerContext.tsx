import { createContext } from "react";

export interface TopLayerContextParams {
  toggleTopLayer: () => void;
}

const TopLayerContext = createContext<TopLayerContextParams>({
  toggleTopLayer: () => {},
});

export default TopLayerContext;