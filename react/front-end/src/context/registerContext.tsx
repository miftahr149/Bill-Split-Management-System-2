import { createContext, useEffect } from "react";
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

export const RegisterContextProvider = ({
  children,
}: RegisterContextProviderParams) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const setStatusField: SetStatusFieldType = (value, field) => {
    if (field == "username") setIsUsernameValid(() => value);
    else if (field == "password") setIsPasswordValid(() => value);
    else setIsConfirmPasswordValid(() => value);
  };

  const checkValidInformation = () => {
    console.log("isUsernameValid: ", isUsernameValid);
    console.log("isPasswordValid:", isPasswordValid);
    console.log("isConfirmPasswordvalid: ", isConfirmPasswordValid);
    console.log("username: ", username);

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
    setStatusField: setStatusField
  };

  useEffect(() => {
    checkValidInformation(); 
  }, [username, password, confirmPassword]);

  return (
    <RegisterContext.Provider value={data}>{children}</RegisterContext.Provider>
  );
};
