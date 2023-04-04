import {
  fetchGoogleApi,
  treatGoogleAPIError,
} from 'components/google/google-api/google-api';
import { numberToLetter } from 'components/util/number-to-letter';

/**
 * Subscribe user to receive user sign status
 */
let _subscriptions: ((signedin: boolean) => void)[] = [];
let _subscriptionInitialised = false;
export const subscribeUserSignedStatus = (
  callback: (signedin: boolean) => void
) => {
  _subscriptions.push(callback);

  if (!_subscriptionInitialised) {
    const subscriptionCaller = (signedin: boolean) => {
      _subscriptions.forEach((callback) => callback(signedin));
    };

    const instance = gapi.auth2.getAuthInstance();
    instance.isSignedIn.listen(subscriptionCaller);
  }

  return () => {
    _subscriptions = _subscriptions.filter((_cb) => _cb !== callback);
  };
};

export const hasSheetScope = () => {
  return gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .hasGrantedScopes('https://www.googleapis.com/auth/spreadsheets');
};

/**
 * Verify if user is signed in
 */
export const isSignedIn = () => {
  const instance = gapi.auth2.getAuthInstance();

  return instance.isSignedIn.get();
};

/**
 * Start signin process
 */
export const onSignIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

/**
 * Start signout process
 */
export const onSignOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

/**
 * Get details of a spreadsheet
 */
export const getSpreadsheetDetails = async (
  spreadsheetId: string
): Promise<gapi.client.Request<gapi.client.sheets.Spreadsheet>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetchGoogleApi<gapi.client.sheets.Spreadsheet>(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`
      );

      return resolve({ body: '', result });
    } catch (error: any) {
      return reject(treatGoogleAPIError(error));
    }
  });
};

/**
 * Create sheet inside spreadsheet
 */
export const createSheet = async (
  spreadsheetId: string,
  title: string,
  columns: string[]
) => {
  try {
    const result = await fetchGoogleApi<{
      replies?: {
        addSheet?: {
          properties?: {
            title: string;
            sheetId: string;
          };
        };
      }[];
    }>(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title,
                },
              },
            },
          ],
        }),
      }
    );

    await addSheetRows(spreadsheetId, title, [columns]);

    const properties = result.replies?.[0].addSheet?.properties;

    if (!properties) throw new Error('Invalid response from the api.');

    return {
      title: properties.title,
      sheetId: properties.sheetId,
    };
  } catch (e) {
    throw treatGoogleAPIError(e);
  }
};

/**
 * Add rows to spreadsheet
 */
export const addSheetRows = async (
  spreadsheetId: string,
  title: string,
  rows: string[][]
) => {
  try {
    const result = await fetchGoogleApi(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${title}!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        body: JSON.stringify({
          values: rows,
        }),
      }
    );
    return result;
  } catch (e) {
    throw treatGoogleAPIError(e);
  }
};

/**
 * Select content of specific sheet
 */
export const getSheetRows = async (
  spreadsheetId: string,
  title: string,
  paramArgs?: { from?: number; to?: number; columns?: number }
) => {
  const args = {
    from: 2,
    columns: 3,
    ...(paramArgs || {}),
  };

  const lastColumn = numberToLetter(args.columns || 1);

  const result = await fetchGoogleApi<{ values: string[][] }>(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${title}!A2:${lastColumn}`
  );

  let values = result.values || [];

  return values;
};

export const createSpreadsheet = async (title: string) => {
  try {
    const result = await fetchGoogleApi<{ spreadsheetId: string }>(
      `https://sheets.googleapis.com/v4/spreadsheets`,
      {
        method: 'POST',
        body: JSON.stringify({
          properties: {
            title,
          },
        }),
      }
    );

    return result;
  } catch (e) {
    throw treatGoogleAPIError(e);
  }
};
