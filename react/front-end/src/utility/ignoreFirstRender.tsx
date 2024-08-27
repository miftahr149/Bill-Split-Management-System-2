import { useEffect, useState } from "react";

interface IgnoreFirstRenderParams {
  fn: () => void;
  deps: any[];
}

const ignoreFirstRender = (fn: () => void, deps: any[]) => {
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }

    fn();
  }, deps);
};

export default ignoreFirstRender
