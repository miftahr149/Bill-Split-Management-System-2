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

export const setAuthorization = (accessToken: string) =>
  `Bearer ${accessToken}`;

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

export const getImage = async (
  setImage: (value: string) => void,
  authTokens: AuthTokensParams
) => {
  console.log("Fetching User's Photo Profile From the Backend");

  tryCatchFetch(async () => {
    const { image } = (await APIFetch({
      URL: setBackendURL("userImage"),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthorization(authTokens.access),
      },
    })) as { image: string };
    setImage(setBackendURL(image.slice(1)));
  });
};
