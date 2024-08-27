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
  const response = await fetch(URL, {...fetchData, mode:"cors"});
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
