import { getGlobalSettings } from 'components/global-settings';
import { FetchResult } from './google-api.types';

/**
 * Fetch from google API using fetch
 * @param url
 * @returns
 */
export const fetchGoogleApi = async (url: string) => {
  const { access_token } = getGlobalSettings();

  if (!access_token) {
    throw new Error('Access token missing');
  }

  const result = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
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
