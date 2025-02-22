import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import {
  checkFirstCharNumber,
  checkSpecialCharacter,
  isEmpty
} from "../../utility/registerUtility";
import { RegisterContext } from "../../context/registerContext";
import { tryCatchFetch, APIFetch, setBackendURL } from "../../utility/myapi";
import { useContext, useState } from "react";

const UsernameField = () => {
  const { username, setUsername, setStatusField } = useContext(RegisterContext);
  const [isUsernameNotUse, setIsUsernameNotUse] = useState(true);

  const checkUsernameTaken = () => {
    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: setBackendURL("isUsernameValid"),
        method: "POST",
        body: JSON.stringify({ username: username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsUsernameNotUse(() => data);
    });
  };

  const checkUsername = () => {
    const isFirstCharNumber = checkFirstCharNumber(username);
    const isSpecialCharacter = checkSpecialCharacter(username);
    return !isFirstCharNumber && !isSpecialCharacter;
  };

  const handleCallback = (value: string, errorArray?: string[]) => {
    setUsername(value);
    setStatusField(errorArray?.length == 0, "username");
  }

  return (
    <LoginField
      name="username"
      type="text"
      callback={handleCallback}
      onBlur={checkUsernameTaken}
    >
      <LoginFieldError value={!isUsernameNotUse}>
        Username is already taken, please use another
      </LoginFieldError>
      <LoginFieldError value={!checkUsername()}>
        Username can't have number in the first character and Special Character
        (@, /, etc)
      </LoginFieldError>
      <LoginFieldError value={isEmpty(username)}>
        Username is empty, please fill in the username field
      </LoginFieldError>
    </LoginField>
  );
};

export default UsernameField;
