import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/utility";

interface AuthProviderParams {
  children: JSX.Element[] | JSX.Element;
}

interface userDataParams {
  username: string;
  password: string;
}

interface AuthTokensParams {
  refresh: string;
  access: string;
}

interface AuthContextParams {
  authTokens: AuthTokensParams;
  username: string;
  loginFunction: (
    userData: userDataParams
  ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isUserValid: boolean;
  logoutFunction: () => void;
  updateToken: () => void;
}

const nullAuthTokens = { refresh: "", access: "" };

const setLocalStorage = (authToken: AuthTokensParams) => {
  localStorage.setItem("authTokens", JSON.stringify(authToken));
  localStorage.setItem("user", JSON.stringify(jwtDecode(authToken.access)));
};

const AuthContext = createContext<AuthContextParams>({
  authTokens: nullAuthTokens,
  username: "",
  loginFunction: (userData: userDataParams) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e;
      userData;
    };
  },
  isUserValid: true,
  logoutFunction: () => {},
  updateToken: () => {},
});

export const AuthProvider = ({ children }: AuthProviderParams) => {
  const [username, setUsername] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string).username
      : ""
  );

  const [authTokens, setAuthTokens] = useState<AuthTokensParams>(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") as string)
      : nullAuthTokens
  );

  const [isUserValid, setIsUserValid] = useState(true);

  const loginFunction = (userData: userDataParams) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const URL = setBackendURL("token/");

      tryCatchFetch(async () => {
        const data = await APIFetch({
          URL: URL,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        setAuthTokens(data);
        setUsername(userData.username);
        setLocalStorage(data);
        console.log("Login Successful");
      });
    };
  };

  const logoutFunction = () => {
    setAuthTokens(nullAuthTokens);
    setUsername("");
    localStorage.removeItem("authTokens");
    localStorage.removeItem("User");
  };

  const updateToken = async () => {
    console.log("Updating Token");
    const URL = setBackendURL("token/refresh");

    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
        errorCallback: logoutFunction,
      });

      setIsUserValid(true);
      setAuthTokens(data);
      setLocalStorage(data);
      console.log("Successfully Updating Token");
    });
  };

  /* ValidateToken return a boolean represent the state of a tokens, if true then the tokens is valid otherwise the token is invalid or expired */
  const validateToken = async () => {
    console.log("Using ValidateToken Function")
    if (authTokens === nullAuthTokens) {
      setIsUserValid(false);
      return;
    }

    const response = await fetch(setBackendURL("token/validate"), {
      headers: {
        Authorization: setAuthorization(authTokens.access),
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
    });

    setIsUserValid(response.ok)
  };

  const contextData = {
    authTokens: authTokens,
    username: username,
    loginFunction: loginFunction,
    isUserValid: isUserValid,
    logoutFunction: logoutFunction,
    updateToken: updateToken,
  };

  // For Every 3 minutes, refresh user token
  useEffect(() => {
    const intervalTime = 3 * 60 * 1000;
    const interval = setInterval(() => {
      if (authTokens.access !== "" && authTokens.refresh !== "") {
        updateToken();
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [authTokens]);

  useEffect(() => {
    validateToken();
  }, [])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
