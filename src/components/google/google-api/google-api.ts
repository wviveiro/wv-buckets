import { getGlobalSettings } from 'components/global-settings';
import { FetchResult } from './google-api.types';

/**
 * Fetch from google API using fetch
 * @param url
 * @returns
 */
export const fetchGoogleApi = async (
  url: string,
  options: RequestInit = {}
) => {
  const { access_token } = getGlobalSettings();

  if (!access_token) {
    throw new Error('Access token missing');
  }

  const result = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...options.headers,
    },
  }).then((result) => result.json());

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
};

/** Get user basic info */
export const getUserInfo = async (): Promise<FetchResult> => {
  return await fetchGoogleApi('https://www.googleapis.com/oauth2/v1/userinfo');
};

export const treatGoogleAPIError = (error: any): string => {
  console.error(error);
  if (typeof error === 'string') return error;
  if (error?.message) {
    return error.message;
  } else if (error?.details) {
    return error.details;
  } else if (error?.result?.error?.message) {
    return error?.result?.error?.message;
  } else {
    return 'Something went wrong trying to authenticated. Check your log';
  }
};
