import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { APIFetch, setBackendURL, tryCatchFetch } from "../utility/myapi";

interface AuthProviderParams {
  children: JSX.Element[] | JSX.Element;
}

type invalidLoginType = () => void;

interface userDataParams {
  username: string;
  password: string;
}

export interface AuthTokensParams {
  refresh: string;
  access: string;
}

interface AuthContextParams {
  authTokens: AuthTokensParams;
  username: string;
  role: string;
  loginFunction: (
    userData: userDataParams,
    invalidLogin?: invalidLoginType
  ) => void;
  isUserValid: boolean;
  logoutFunction: () => void;
  updateToken: () => void;
  register: (username: string, password: string, callback?: () => void) => void;
}

const nullAuthTokens = { refresh: "", access: "" };

const setLocalStorage = (authToken: AuthTokensParams) => {
  localStorage.setItem("authTokens", JSON.stringify(authToken));
  localStorage.setItem("user", JSON.stringify(jwtDecode(authToken.access)));
};

const AuthContext = createContext<AuthContextParams>({
  authTokens: nullAuthTokens,
  role: "",
  username: "",
  loginFunction: (userData: userDataParams) => {
    userData;
  },
  isUserValid: true,
  logoutFunction: () => {},
  updateToken: () => {},
  register: (username: string, password: string, callback?: () => void) => {
    username; password; callback;
  },
});

export const AuthProvider = ({ children }: AuthProviderParams) => {
  const initRole = () => {
    const userData = localStorage.getItem("user");
    if (userData === null) return "";
    return JSON.parse(userData as string).role;
  };

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

  const [isUserValid, setIsUserValid] = useState(
    Boolean(localStorage.getItem("authTokens"))
  );

  const [role, setRole] = useState<string>(initRole);

  const loginFunction = (
    userData: userDataParams,
    invalidLogin: invalidLoginType = () => {}
  ) => {
    tryCatchFetch(async () => {
      const data = await APIFetch({
        URL: setBackendURL("token/"),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        errorCallback: invalidLogin,
      });

      setIsUserValid(() => true);
      setAuthTokens(data);
      setUsername(userData.username);
      setLocalStorage(data);
      setRole(initRole);
      console.log("Login Successful");
    });
  };

  const logoutFunction = () => {
    setIsUserValid(false);
    setAuthTokens(nullAuthTokens);
    setUsername("");
    setRole("");

    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
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

  const register = (username: string, password: string, callback?: () => void) => {
    tryCatchFetch(async () => {
      await APIFetch({
        URL: setBackendURL("register"),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
      });
      callback?.();
    }) 
  }

  const contextData = {
    authTokens: authTokens,
    username: username,
    role: role,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    isUserValid: isUserValid,
    updateToken: updateToken,
    register: register,
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
    updateToken();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
