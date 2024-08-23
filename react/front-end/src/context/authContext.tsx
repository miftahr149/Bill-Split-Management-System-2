import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

const nullAuthToken = { refresh: "", access: "" };

const setLocalStorage = (authToken: AuthTokensParams) => {
  localStorage.setItem("authTokens", JSON.stringify(authToken));
  localStorage.setItem("user", JSON.stringify(jwtDecode(authToken.access)));
};

const AuthContext = createContext<AuthContextParams>({
  authTokens: nullAuthToken,
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
      : nullAuthToken
  );

  const [isUserValid, setIsUserValid] = useState(true);

  const loginFunction = (userData: userDataParams) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const URL = "http://127.0.0.1:8000/api/token/";

      const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setIsUserValid(false);
        return;
      }

      const data = await response.json();
      setAuthTokens(data);
      setUsername(userData.username);
      setLocalStorage(data);
      console.log("Login Successful");
    };
  };

  const logoutFunction = () => {
    setAuthTokens(nullAuthToken);
    setUsername("");
    localStorage.removeItem("authTokens");
    localStorage.removeItem("User");
  };

  const updateToken = async () => {
    console.log("Updating Token");
    const URL = "http://127.0.0.1:8000/api/token/refresh";

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
      mode: "cors",
      method: "POST",
    });

    // Logout the user if the request is invalid 
    if (!response.ok) {
      logoutFunction();
      return;
    }

    const data = await response.json();
    setAuthTokens(data);
    setLocalStorage(data);
    console.log("Successfully Updating Token");
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

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
