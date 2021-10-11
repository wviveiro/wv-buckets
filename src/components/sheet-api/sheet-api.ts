import { getGlobalSettings } from 'components/global-settings';

/**
 * Authenticate application using client id from local storage
 */
export const authenticate = async () => {
  const globalSettings = getGlobalSettings();
  if (!globalSettings.client_id || !gapi)
    throw new Error('Missing client ID or GAPI');

  return new Promise(async (resolve, reject) => {
    const init = async () => {
      try {
        await gapi.client.init({
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
          clientId: globalSettings.client_id,
          scope: 'https://www.googleapis.com/auth/spreadsheets',
        });
      } catch (error: any) {
        console.error(error);
        if (error?.message) {
          return reject(error.message);
        } else if (error?.details) {
          return reject(error.details);
        } else {
          return reject(
            'Something went wrong trying to authenticated. Check your log'
          );
        }
      }

      resolve(true);
    };

    gapi.load('client:auth2', init);
  });
};

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
 * Get details of a spreadsheet
 */
export const getSpreadsheetDetails = async (
  spreadsheetId: string
): Promise<gapi.client.Request<gapi.client.sheets.Spreadsheet>> => {
  return gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
    fields:
      'sheets.properties.title,sheets.properties.sheetId,properties.title',
  });
};
