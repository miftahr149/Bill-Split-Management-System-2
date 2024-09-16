import { AuthTokensParams } from "../context/authContext";

interface FetchApiParam {
  URL: string;
  method: string;
  errorCallback?: () => void;
  headers: HeadersInit | undefined;
  body?: BodyInit | null | undefined;
}

const backendURL = "http://127.0.0.1:8000/api/";

export const setBackendURL = (url: string) => backendURL + url;

export const setAuthorization = (accessToken: string) => {
  return `Bearer ${accessToken}`;
}

export const APIFetch = async ({
  URL,
  errorCallback,
  ...fetchData
}: FetchApiParam) => {
  const response = await fetch(URL, { ...fetchData, mode: "cors" });
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) errorCallback();
    throw new Error(data);
  }

  return data;
};

export const tryCatchFetch = (fetchFunction: () => void) => {
  try {
    fetchFunction();
  } catch (error) {
    console.log(error);
  }
};

export const setImageURL = (imageURL: string) =>
  setBackendURL(imageURL.slice(1));

export const getImage = async (
  setImage: React.Dispatch<React.SetStateAction<string>>,
  authTokens: AuthTokensParams,
  username: string,
) => {
  console.log("Fetching User's Photo Profile From the Backend");

  tryCatchFetch(async () => {
    const { image } = (await APIFetch({
      URL: setBackendURL("userImage/get"),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthorization(authTokens.access),
      },
      body: JSON.stringify({username: username})
    })) as { image: string };
    setImage(setImageURL(image));
  });
};
