import { createContext } from "react";

export interface ChangeEmailContextParams {
  email: string;
  newEmail: string;
  setNewEmail: (newEmail: string) => void;
  setIsSentEmailChange: (value: boolean) => void;
}

const ChangeEmailContext = createContext<ChangeEmailContextParams>({
  email: "",
  newEmail: "",
  setNewEmail: (value) => {value},
  setIsSentEmailChange: (value) => {value},
});

export default ChangeEmailContext;