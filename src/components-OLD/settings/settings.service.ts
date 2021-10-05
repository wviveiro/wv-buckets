import {
  bucketStorageName,
  GapiSubscription,
  SettingsInterface,
} from './settings.interface';

declare global {
  interface Window {
    gapi: any;
  }
}

/**
 * Get global settings from local storage
 */
export const getGlobalSettings = (): SettingsInterface => {
  const defaultSettings = {
    apikey: '',
    client_id: '',
    spid: '',
    accounts: [],
  };

  const strGlobalSettings = localStorage.getItem(bucketStorageName);
  if (!strGlobalSettings) return defaultSettings;
  const globalSettings: SettingsInterface = JSON.parse(strGlobalSettings);
  if (!globalSettings) return defaultSettings;
  return globalSettings;
};

export const saveGlobalSettings = (
  globalSettings: Partial<SettingsInterface>
) => {
  localStorage.setItem(bucketStorageName, JSON.stringify(globalSettings));
};

export const deleteGlobalSettings = () => {
  localStorage.removeItem(bucketStorageName);
};

let getGapiSubscription: GapiSubscription | undefined = undefined;
export const getGapi = async (
  reload = false
): Promise<GapiSubscription['gapi']> => {
  // Create iframe that will serve gapi
  const initialise = (): Promise<GapiSubscription> => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow?.document?.open();
    iframe.contentWindow?.document?.write(
      '<body><script src="/gapiloader.js"></script></body>'
    );
    iframe.contentWindow?.document?.close();

    return new Promise((resolve) => {
      const loadIframe = () => {
        const subscribe = (iframe.contentWindow as any)?.subscribe;
        if (!subscribe) {
          return setTimeout(() => {
            loadIframe();
          }, 100);
        }
        const unsubscribe = subscribe((gapi: any) => {
          resolve({
            gapi,
            unsubscribe: () => {
              document.body.removeChild(iframe);
              unsubscribe();
            },
          });
        });
      };
      loadIframe();
    });
  };

  if (reload && getGapiSubscription !== undefined) {
    getGapiSubscription.unsubscribe();
    getGapiSubscription = await initialise();
  } else if (getGapiSubscription === undefined) {
    getGapiSubscription = await initialise();
  }

  return getGapiSubscription.gapi;
};

/**
 * Verify if information from settings is authenticated
 */
let _isAppAuthenticated = false;
export const isAppAuthenticated = async (
  forced = false
): Promise<{ isAuthenticated: boolean; isSignedIn: boolean }> => {
  let gapi = await getGapi(forced);

  if (_isAppAuthenticated && !forced) {
    return {
      isAuthenticated: true,
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
    };
  }
  _isAppAuthenticated = false;

  return new Promise((resolve, reject) => {
    // function only runs when app is initialised
    const initialise = async () => {
      const globalSettings = getGlobalSettings();
      const required: (keyof SettingsInterface)[] = [
        'apikey',
        'client_id',
        'spid',
      ];
      const invalid = required.find(
        (field) => !`${globalSettings?.[field]}`.trim()
      );

      if (invalid) return reject('Invalid global settings');

      let signedIn = false;
      try {
        await gapi.client.init({
          apiKey: globalSettings.apikey,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
          clientId: globalSettings.client_id,
          scope: 'https://www.googleapis.com/auth/spreadsheets',
        });

        if (getGapiSubscription) getGapiSubscription.gapi = gapi;

        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(changeAuthStatus);
        signedIn = (await gapi.auth2.getAuthInstance()).isSignedIn.get();

        // Handle the initial sign-in state.
        changeAuthStatus(signedIn);
      } catch (e) {
        if (typeof e === 'string') return reject(e);
        if (e instanceof Error) return reject(e.message);
        if (e.error?.message) return reject(e.error.message);
        if (e.details) return reject(e.details);
        console.log('Error not identified', e);
        return reject('Not possible to initialise gapi');
      }
      _isAppAuthenticated = true;
      resolve({
        isAuthenticated: true,
        isSignedIn: signedIn,
      });
    };

    gapi.load('client:auth2', initialise);
  });
};

export const handleSignin = async () => {
  const gapi = await getGapi();

  gapi.auth2.getAuthInstance().signIn();
};

export const handleSignout = async () => {
  const gapi = await getGapi();

  gapi.auth2.getAuthInstance().signOut();
};

/**
 * Subscriber to check if user is logged in
 */
let subscriptions: ((status: boolean) => void)[] = [];
let isSignedIn = false;
const changeAuthStatus = (_isSignedIn: boolean) => {
  isSignedIn = _isSignedIn;
  subscriptions.forEach((sub) => sub(isSignedIn));
};

export const subscribeUserStatus = (callback: (status: boolean) => void) => {
  subscriptions.push(callback);
  return () => {
    subscriptions = subscriptions.filter((sub) => sub !== callback);
  };
};

export const authenticateInitialiser = async (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const unsubscribe = subscribeUserStatus((status) => {
      resolve(status);
      unsubscribe();
    });

    try {
      await isAppAuthenticated();
    } catch (error) {
      return resolve(false);
    }
  });
};
