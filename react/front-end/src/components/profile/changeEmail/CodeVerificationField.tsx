import "../../../assets/css/codeVerificationField.css";
import { useRef, useState, useEffect, useContext } from "react";
import ChangeEmailContext from "../../../context/changeEmailContext";

interface CodeVerificationFieldParams {
  numDigit: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CodeVerificationField = ({
  numDigit,
  onSubmit,
}: CodeVerificationFieldParams) => {
  const createArray = () =>
    Array.from({ length: numDigit }, (_, index) => index);

  const createRefElementArray = () => {
    return createArray().map(() => useRef<HTMLInputElement>(null));
  };
  
  const [code, setCode] = useState("");
  const refElementArray = createRefElementArray();
  const refSubmitButton = useRef<HTMLInputElement>(null);
  const { setIsSentEmailChange } = useContext(ChangeEmailContext)


  const checkValidDigit = (value: string) => {
    const array = value.split("");
    const filter = array.filter((value) => !/^[0-9]$/.test(value));
    return filter.length === 0;
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target;
    const nextInput = refElementArray[index + 1];

    e.preventDefault();
    let newCode = [...code];

    if (!checkValidDigit(input.value)) {
      e.currentTarget.value = newCode[index] || "";
      return;
    }

    const lastElement = input.value[input.value.length - 1];
    const value = input.value.length === 1 ? input.value : lastElement;
    newCode[index] = value;
    e.currentTarget.value = value;

    if (nextInput) nextInput.current?.focus();
    setCode(() => newCode.join(""));
  };

  const handleReset = () => {
    setCode(() => "");
    for (const ref of refElementArray) {
      if (ref?.current) {
        ref.current.value = "";
      }
    }
  };

  const handleAbort = () => {
    setIsSentEmailChange(false);
  }

  const deleteCodeIndex = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.currentTarget.value = "";
    setCode(() => code.slice(0, index) + code.slice(index + 1));
  };

  const moveToPreviousInput = (index: number) => {
    const prevInput = refElementArray[index - 1];
    prevInput?.current?.focus();
  };

  const moveToNextInput = (index: number) => {
    const nextInput = refElementArray[index + 1];
    nextInput?.current?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.code === "Backspace") {
      e.preventDefault();
      deleteCodeIndex(e, index);
      moveToPreviousInput(index);
    } else if (e.code === "ArrowRight") {
      moveToNextInput(index);
    } else if (e.code === "ArrowLeft") {
      moveToPreviousInput(index);
    } else if (index === numDigit - 1) {
      refSubmitButton.current?.focus();
    }
  };

  useEffect(() => {
    refElementArray[0].current?.focus();
  }, []);

  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-4">
      <div className="d-flex gap-2 justify-content-center">
        {createArray().map((value) => (
          <input
            className="code-verification text-center"
            key={value}
            ref={refElementArray[value]}
            onChange={(e) => handleInput(e, value)}
            onKeyDown={(e) => handleKeyDown(e, value)}
          />
        ))}
        <button type="button" className="code-reset bi bi-x-square" onClick={handleReset} />
      </div>
      <div className="d-flex gap-2">
        <input
          className="btn btn-danger mx-2 flex-grow-1"
          type="button"
          value="Abort"
          onClick={handleAbort}
        />
        <input
          className="btn btn-success mx-2 flex-grow-1"
          type="submit"
          disabled={code.length != numDigit}
          value="submit"
          ref={refSubmitButton}
        />
      </div>
    </form>
  );
};

export default CodeVerificationField;
