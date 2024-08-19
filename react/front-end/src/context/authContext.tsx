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

  const loginFunction = (userData: userDataParams) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const URL = "http://127.0.0.1:8000/api/token/";

      try {
        const response = await fetch(URL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Response is not ok");
        }

        const data = await response.json();
        setAuthTokens(data);
        setUsername(userData.username);
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(jwtDecode(data.access)));
        console.log("Login Successful");
      } catch (error) {
        alert(error);
      }
    };
  };

  const contextData = {
    authTokens: authTokens,
    username: username,
    loginFunction: loginFunction,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
