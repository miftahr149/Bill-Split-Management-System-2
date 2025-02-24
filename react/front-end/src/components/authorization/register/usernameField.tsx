import AuthField from "../authField";
import AuthFieldError from "../authFieldError";

import {
  checkFirstCharNumber,
  checkSpecialCharacter,
  isEmpty
} from "../../../utility/registerUtility";
import { RegisterContext } from "../../../context/registerContext";
import { tryCatchFetch, APIFetch, setBackendURL } from "../../../utility/myapi";
import { useContext, useState } from "react";

/** the extends of AutField for providing username field in registration features */
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
    <AuthField
      name="username"
      type="text"
      callback={handleCallback}
      onBlur={checkUsernameTaken}
    >
      <AuthFieldError value={!isUsernameNotUse}>
        Username is already taken, please use another
      </AuthFieldError>
      <AuthFieldError value={!checkUsername()}>
        Username can't have number in the first character and Special Character
        (@, /, etc)
      </AuthFieldError>
      <AuthFieldError value={isEmpty(username)}>
        Username is empty, please fill in the username field
      </AuthFieldError>
    </AuthField>
  );
};

export default UsernameField;
