import { createContext } from "react";

export interface AuthFieldContextParams {
  addError: (errorName: string) => void;
  removeError: (errorName: string) => void;
  isUserInput: boolean;
}

/** Context to handle state inside the AuthField */
export const AuthFieldContext = createContext<AuthFieldContextParams>({
  addError: (errorName: string) => {errorName},
  removeError: (errorName: string) => {errorName},
  isUserInput: false,
});