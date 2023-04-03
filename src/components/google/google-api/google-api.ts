import {
  getGlobalSettings,
  setGlobalSettings,
} from 'components/global-settings';
import { FetchResult } from './google-api.types';

/**
 * Fetch from google API using fetch
 * @param url
 * @returns
 */
export const fetchGoogleApi = async <T extends unknown>(
  url: string,
  options: RequestInit = {},
  retry: boolean = false
): Promise<T> => {
  const { wvid, ...settings } = getGlobalSettings();

  const fallback = async () => {
    if (!wvid) throw new Error('WVID not set');
    return await requestToken(wvid);
  };

  const access_token = settings.access_token || (await fallback());

  const result = await (
    await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        ...options.headers,
      },
    })
  ).json();

  if (result.error) {
    if (!retry) {
      const new_access_token = await fallback();
      setGlobalSettings({ access_token: new_access_token });
      return fetchGoogleApi(url, options, true);
    }

    throw new Error(result.error.message);
  }

  return result;
};

export const requestToken = async (authToken: string) => {
  const requestURL = new URL('request-token', process.env.REACT_APP_BACKEND);
  const checkResult = await (
    await fetch(requestURL.href, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  ).json();

  if (!checkResult.access_token) throw new Error('Invalid WVID token');

  return checkResult.access_token;
};

/** Get user basic info */
export const getUserInfo = async (): Promise<FetchResult> => {
  return await fetchGoogleApi<FetchResult>(
    'https://www.googleapis.com/oauth2/v1/userinfo'
  );
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
