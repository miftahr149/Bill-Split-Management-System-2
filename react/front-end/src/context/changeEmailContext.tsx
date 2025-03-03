import { createContext } from "react";

export interface ChangeEmailContextParams {
  setIsSentEmailChange: (value: boolean) => void;
}

const ChangeEmailContext = createContext<ChangeEmailContextParams>({
  setIsSentEmailChange: (value) => {value},
});

export default ChangeEmailContext;