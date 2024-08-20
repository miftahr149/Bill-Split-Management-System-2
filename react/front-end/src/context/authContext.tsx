import { createContext, useState } from "react";
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
}

const AuthContext = createContext<AuthContextParams>({
  authTokens: {
    refresh: "",
    access: "",
  },
  username: "",
  loginFunction: (userData: userDataParams) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e;
      userData;
    };
  },
  isUserValid: true,
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
      : { access: "", refresh: "" }
  );

  const [isUserValid, setisUserValid] = useState(true);

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
        setisUserValid(false);
        return;
      }

      const data = await response.json();
      setAuthTokens(data);
      setUsername(userData.username);
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwtDecode(data.access)));
      console.log("Login Successful");
    };
  };

  const contextData = {
    authTokens: authTokens,
    username: username,
    loginFunction: loginFunction,
    isUserValid: isUserValid,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
