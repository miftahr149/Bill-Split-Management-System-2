import { useContext, createContext, useEffect, useState } from "react";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
  setImageURL
} from "../utility/myapi";
import AuthContext from "./authContext";
import { UserParams } from "../components/billSplitCard";

interface ImagesParams {
  [username: string]: string;
}

interface UserProfileParams {
  user: UserParams;
  image: string;
}

interface UserProfileContextParams {
  images: ImagesParams;
  getImage: (username: string) => string;
}

interface ImageContextProviderParams {
  children: JSX.Element | JSX.Element[];
}

export const UserProfileContext = createContext<UserProfileContextParams>({
  images: {},
  getImage: (value: string) => value
});

export const UserProfileProvider = ({
  children,
}: ImageContextProviderParams) => {
  const [images, setImages] = useState<ImagesParams>({});
  const { authTokens } = useContext(AuthContext);

  const getImage = (username: string) => {
    try {
      return images[username];
    } catch (e: unknown) {
      return "";
    }
  }

  useEffect(() => {
    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: setBackendURL("userImage"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as UserProfileParams[];

      setImages((previousState: ImagesParams) => {
        data.forEach((value: UserProfileParams) => {
          previousState[value.user.username] = setImageURL(value.image);
        });
        return previousState;
      });
    });
  }, []);

  const value = {
    images: images,
    getImage: getImage
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  )
};
