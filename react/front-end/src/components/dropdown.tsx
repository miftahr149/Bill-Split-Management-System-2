import "../assets/css/dropdown.css"
import { useState, createContext, useContext } from "react";


interface DropdownParams {
  name: string;
  children: JSX.Element[] | JSX.Element;
}

interface DropdownElementParams {
  children: JSX.Element[] | JSX.Element;
  callback: () => void;
}

interface DropdownContextParams {
  isClick: boolean;
  setIsClick: (value: boolean) => void;
}

const dropdownContext = createContext<DropdownContextParams>({
  isClick: false,
  setIsClick: (value: boolean) => {
    value;
  },
});

export const Dropdown = ({ name, children }: DropdownParams) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => setIsClick((value: boolean) => !value);
  const setContentClassName = () => {
    const defaultClassName = "dropdown-content";
    return isClick ? defaultClassName : defaultClassName + " none";
  };

  const value: DropdownContextParams = {
    isClick: isClick,
    setIsClick: (value: boolean) => setIsClick(value),
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-button my-button box--white-text"
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

export const DropdownElement = ({
  children,
  callback,
}: DropdownElementParams) => {
  const { setIsClick } = useContext(dropdownContext);

  const handleClick = () => {
    callback();
    setIsClick(false);
  };

  return (
    <button
      className="dropdown-element my-button box--white-text"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
