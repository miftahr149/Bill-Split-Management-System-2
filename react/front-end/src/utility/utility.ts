interface FetchApiParam {
  URL: string;
  method: "GET";
  headers: HeadersInit | undefined;
  body?: BodyInit | null | undefined;
}

const backendURL = "http://127.0.0.1/api/"

export const setBackendURL = (url: string) => backendURL + url;

export const setAuthorization = (accessToken: string) =>
  `Bearer ${accessToken}`;

export const APIFetch = async ({ URL, ...fetchData }: FetchApiParam) => {
  const response = await fetch(URL, fetchData);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
