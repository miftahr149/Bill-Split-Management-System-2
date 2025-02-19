import { createContext } from "react";

export interface LoginFieldContextParams {
  incrementNumError: () => void;
  decrementNumError: () => void;
}

export const LoginFieldContext = createContext<LoginFieldContextParams>({
  incrementNumError: () => {},
  decrementNumError: () => {}
});