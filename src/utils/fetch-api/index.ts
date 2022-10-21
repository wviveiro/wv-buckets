import { getGlobalSettings } from "../global-settings";

/**
 * Fetch API using fetch
 * @param url
 * @returns
 */
export const fetchApi = async (url: URL, options: RequestInit = {}) => {
  const { access_token } = getGlobalSettings();

  if (!access_token) {
    throw new Error("Access token missing");
  }

  const result = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      ...options.headers,
    },
  }).then((result) => result.json());

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
};

/**
 * Fetch data from google API
 * @param endpoint
 * @param options
 * @returns
 */
export const fetchGoogleApi = (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = "https://www.googleapis.com";
  const url = new URL(endpoint, baseUrl);
  return fetchApi(url, options);
};
