import { createContext } from "react";

export interface ChangeEmailContextParams {
  incrementPageState: () => void;
  decrementPageState: () => void;
  setIsSentEmailChange: (value: boolean) => void;
}

const ChangeEmailContext = createContext<ChangeEmailContextParams>({
  incrementPageState: () => {},
  decrementPageState: () => {},
  setIsSentEmailChange: (value) => {value}
});

export default ChangeEmailContext;