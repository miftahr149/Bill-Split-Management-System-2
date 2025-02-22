import { createContext } from "react";

export interface LoginFieldContextParams {
  addError: (errorName: string) => void;
  removeError: (errorName: string) => void;
  isUserInput: boolean;
}

export const LoginFieldContext = createContext<LoginFieldContextParams>({
  addError: (errorName: string) => {errorName},
  removeError: (errorName: string) => {errorName},
  isUserInput: false,
});