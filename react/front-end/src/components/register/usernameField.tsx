import LoginField from "../login/loginField";
import LoginFieldError from "../login/loginFieldError";

import { ignoreFirstRender } from "../../utility/utility";
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
      console.log(data);
      setIsUsernameNotUse(() => data);
    });
  };

  const checkUsername = () => {
    const isFirstCharNumber = checkFirstCharNumber(username);
    const isSpecialCharacter = checkSpecialCharacter(username);
    return !isFirstCharNumber && !isSpecialCharacter;
  };

  ignoreFirstRender(() => {
    setStatusField(checkUsername(), "username");
  }, [username]);

  return (
    <LoginField
      name="username"
      type="text"
      callback={setUsername}
      onBlur={checkUsernameTaken}
    >
      <LoginFieldError trigger={() => !isUsernameNotUse}>
        Username is already taken, please use another
      </LoginFieldError>
      <LoginFieldError trigger={() => !checkUsername()}>
        Username can't have number in the first character and Special Character
        (@, /, etc)
      </LoginFieldError>
      <LoginFieldError trigger={() => isEmpty(username)}>
        Username is empty, please fill in the username field
      </LoginFieldError>
    </LoginField>
  );
};

export default UsernameField;
