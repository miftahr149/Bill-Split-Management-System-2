import {
  AuthFieldContextParams,
  AuthFieldContext,
} from "../../context/authFieldContext";
import { useState, useEffect } from "react";

interface AuthFieldParams {
  name: string;
  type: string;
  callback: (value: string, errorArray?: string[]) => void;
  onBlur?: () => void;
  children?: JSX.Element[] | JSX.Element;
}

/** Field to input authorization information (username, password)
 *  @param {AuthFieldParams} name - the name of the field
 *  @param {AuthFieldParams} type - the type of the inputted information (text, password, etc)
 *  @param {AuthFieldParams} callback - a function that will be call whenever the user input a key
 *  @param {AuthFieldParams} onBlur - a function that will be call whenever user not select this field
 *  @param {AuthFieldParams} children - represent the list of errors in this field
 */
const AuthField = ({
  name,
  type,
  callback,
  onBlur,
  children,
}: AuthFieldParams) => {
  const [isUserInput, setIsUserInput] = useState(false);
  const [errorArray, setArrayError] = useState<string[]>([]);
  const [fieldValue, setFieldValue] = useState("");

  /** add error to the list which change the style of field to error state
   *  @param {string} errorName - the name of error
   */
  const addError = (errorName: string) => {
    setArrayError((currentState) => {
      return [...currentState, errorName];
    });
  };

  /** Remove the error from the the list
   *  @param {string} errorName - the name of error that want to be deleted
   */
  const removeError = (errorName: string) => {
    setArrayError((currentState) => {
      return currentState.filter((value) => value != errorName);
    });
  };

  const data: AuthFieldContextParams = {
    addError: addError,
    removeError: removeError,
    isUserInput: isUserInput,
  };

  /** set the style of the field. if there is error (based on the length of list 'errorArray'), 
   *  the field will have change to error style
   */
  const setStyle = () => {
    if (errorArray.length == 0 || !isUserInput)
      return "field d-flex flex-column";
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
    <AuthFieldContext.Provider value={data}>
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
    </AuthFieldContext.Provider>
  );
};

export default AuthField;
