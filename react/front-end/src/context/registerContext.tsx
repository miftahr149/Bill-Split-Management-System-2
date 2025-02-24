import { createContext } from "react";
import { useState } from "react";

type SetStatusFieldType = (
  value: boolean,
  field: "username" | "password" | "confirm password"
) => void;

interface RegisterContextParams {
  username: string;
  password: string;
  confirmPassword: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setStatusField: SetStatusFieldType;
  checkValidInformation: () => boolean;
}

interface RegisterContextProviderParams {
  children: JSX.Element[] | JSX.Element;
}

/** a Context to handle registration state  */
export const RegisterContext = createContext<RegisterContextParams>({
  username: "",
  password: "",
  confirmPassword: "",
  setUsername: (value: string) => {
    value;
  },
  setPassword: (value: string) => {
    value;
  },
  setConfirmPassword: (value: string) => {
    value;
  },
  setStatusField: (value, field) => {
    value;
    field;
  },
  checkValidInformation: () => false,
});

/** a provider component that give registration state and function to its children
 *  @param {RegisterContextProviderParams} children - the react component that will handle registration
 */
export const RegisterContextProvider = ({
  children,
}: RegisterContextProviderParams) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  /** a function set status of field in registration
   *  @param {boolean} value - the current status of a field
   *  @param {string} field - the field ("username", "password", or "confirm password")
   */
  const setStatusField: SetStatusFieldType = (value, field) => {
    if (field == "username") setIsUsernameValid(() => value);
    else if (field == "password") setIsPasswordValid(() => value);
    else setIsConfirmPasswordValid(() => value);
  };

  /** a function to check whether all the field is correct or not
   *  @returns {boolean} - true if all fields have the valid information, otherwise false
   */
  const checkValidInformation = () => {
    const validInformation =
      isUsernameValid && isPasswordValid && isConfirmPasswordValid;
    return validInformation;
  };

  const data: RegisterContextParams = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
    setUsername: (value) => setUsername(() => value),
    setPassword: (value) => setPassword(() => value),
    setConfirmPassword: (value) => setConfirmPassword(() => value),
    checkValidInformation: checkValidInformation,
    setStatusField: setStatusField,
  };

  return (
    <RegisterContext.Provider value={data}>{children}</RegisterContext.Provider>
  );
};
