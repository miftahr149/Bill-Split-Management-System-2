import "../assets/css/choice.css";
import { createContext, useContext } from "react";

interface ChoiceElementParams {
  value: string;
  children?: JSX.Element | JSX.Element[];
}

interface ChoiceBoxParams {
  callback: (value: string) => void;
  children: JSX.Element[] | JSX.Element;
  variable: string;
}

interface ChoiceContextParams {
  callback: (value: string) => void;
  variable: string;
}

const ChoiceContext = createContext<ChoiceContextParams>({
  callback: (value: string) => {
    value;
  },
  variable: "",
});

export const ChoiceElement = ({ value, children }: ChoiceElementParams) => {
  const { callback, variable } = useContext(ChoiceContext);

  const setClassName = () => {
    const defaultClass =
      "element my-button d-flex flex-center text-color-dark text-bold";
    return variable === value ? defaultClass + " element--focus" : defaultClass;
  };

  return (
    <button onClick={() => callback(value)} className={setClassName()}>
      {typeof children === "undefined"
        ? value[0].toUpperCase() + value.slice(1)
        : children}
    </button>
  );
};

export const ChoiceBox = ({
  callback,
  variable,
  children,
}: ChoiceBoxParams) => {
  const contextValue = {
    callback: callback,
    variable: variable,
  };

  return (
    <ChoiceContext.Provider value={contextValue}>
      <div className="choice-box d-flex gap--sm">{children}</div>
    </ChoiceContext.Provider>
  );
};
