import {
  LoginFieldContextParams,
  LoginFieldContext,
} from "../../context/loginFieldContext";
import { useState, useEffect } from "react";

interface LoginFieldParams {
  name: string;
  type: string;
  callback: (value: string, errorArray?: string[]) => void;
  onBlur?: () => void;
  children?: JSX.Element[] | JSX.Element;
}

const LoginField = ({
  name,
  type,
  callback,
  onBlur,
  children,
}: LoginFieldParams) => {
  const [isUserInput, setIsUserInput] = useState(false);
  const [errorArray, setArrayError] = useState<string[]>([]);
  const [fieldValue, setFieldValue] = useState("");

  const addError = (errorName: string) => {
    setArrayError((currentState) => {
      return [...currentState, errorName];
    });
  };

  const removeError = (errorName: string) => {
    setArrayError((currentState) => {
      return currentState.filter((value) => value != errorName);
    });
  };

  const data: LoginFieldContextParams = {
    addError: addError,
    removeError: removeError,
    isUserInput: isUserInput,
  };

  const setStyle = () => {
    if (errorArray.length == 0 || !isUserInput) return "field d-flex flex-column";
    return "field field--error d-flex flex-column";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserInput(() => true);
    setFieldValue(() => e.target.value);
  };

  useEffect(() => {
    callback(fieldValue, errorArray);
  }, [fieldValue, errorArray]);

  return (
    <LoginFieldContext.Provider value={data}>
      <div className={setStyle()}>
        <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
        <input
          type={type}
          name={name}
          placeholder={name}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </div>
      {children}
    </LoginFieldContext.Provider>
  );
};

export default LoginField;
