import { useState, useEffect } from "react";

export const ignoreFirstRender = (func: () => void, deps: any[]) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  return useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    };

    func();
  }, deps)
}