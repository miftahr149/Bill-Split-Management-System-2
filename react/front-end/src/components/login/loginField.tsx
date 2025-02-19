import {
  LoginFieldContextParams,
  LoginFieldContext,
} from "../../context/loginFieldContext";
import { useState, useEffect } from "react";

interface LoginFieldParams {
  name: string;
  type: string;
  callback: (value: string) => void;
  onBlur?: () => void;
  children?: JSX.Element[] | JSX.Element
}

const LoginField = ({ name, type, callback, onBlur, children }: LoginFieldParams) => {
  const [numError, setNumError] = useState(0);

  const incrementNumError = () => setNumError((prevState) => prevState + 1);
  const decrementNumError = () => setNumError((prevState) => prevState - 1);

  const data: LoginFieldContextParams = {
    incrementNumError: incrementNumError,
    decrementNumError: decrementNumError,
  };

  const setStyle = () => {
    return numError == 0
      ? "field d-flex flex-column"
      : "field field--error d-flex flex-column";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e.target.value);
  };

  useEffect(() => {
    console.log(numError);
  }, [numError])

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
