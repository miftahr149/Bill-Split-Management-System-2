import { createContext } from "react";

export interface ChangeEmailContextParams {
  email: string;
  toEmail: string;
  setToEmail: (toEmail: string) => void;
  setIsSentEmailChange: (value: boolean) => void;
}

const ChangeEmailContext = createContext<ChangeEmailContextParams>({
  email: "",
  toEmail: "",
  setToEmail: (value) => {value},
  setIsSentEmailChange: (value) => {value},
});

export default ChangeEmailContext;