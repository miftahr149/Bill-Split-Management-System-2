import "../assets/css/dropdown.css";
import { useState, createContext, useContext } from "react";

interface DropdownParams {
  name: string;
  children: JSX.Element[] | JSX.Element;
  callback: (value: string) => void;
}

interface DropdownElementParams {
  children?: JSX.Element[] | JSX.Element;
  value: string;
}

interface DropdownContextParams {
  setIsClick: (value: boolean) => void;
  callback: (value: string) => void;
}

const dropdownContext = createContext<DropdownContextParams>({
  setIsClick: (value: boolean) => {
    value;
  },
  callback: (value: string) => {
    value;
  },
});

export const Dropdown = ({ name, children, callback }: DropdownParams) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => setIsClick((value: boolean) => !value);
  const setContentClassName = () => {
    const defaultClassName = "dropdown-content";
    return isClick ? defaultClassName : defaultClassName + " none";
  };

  const value: DropdownContextParams = {
    setIsClick: (value: boolean) => setIsClick(value),
    callback: callback,
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-button my-button text-color-white"
        onClick={handleClick}
      >
        {name}
      </button>
      <div className={setContentClassName()}>
        <dropdownContext.Provider value={value}>
          {children}
        </dropdownContext.Provider>
      </div>
    </div>
  );
};

export const DropdownElement = ({ children, value }: DropdownElementParams) => {
  const { setIsClick, callback } = useContext(dropdownContext);

  const handleClick = () => {
    callback(value);
    setIsClick(false);
  };

  return (
    <button
      className="dropdown-element my-button text-color-white"
      onClick={handleClick}
    >
      {typeof children === "undefined" ? (
        <p className="my-text text-bold">{value}</p>
      ) : (
        children
      )}
    </button>
  );
};
