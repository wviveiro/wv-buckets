import { setAlert } from 'components/alert';
import {
  getGlobalSettings,
  setGlobalSettings,
} from 'components/global-settings';
import { initialiseDatabase } from 'components/schemas';
import {
  authenticate,
  isSignedIn,
  subscribeUserSignedStatus,
} from 'components/sheet-api';
import { Status } from 'components/util/status';
import { createContext, useContext, useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import {
  AccountInterface,
  AppContextInterface,
  AppStateInterface,
} from './app.interface';

export const AppContext = createContext<AppContextInterface>({
  status: Status.initializing,
  authenticated: false,
  signedin: false,
  accounts: { ids: [], entities: {} },
  onAddAccount: () => {
    // Not implemented
  },
});

export const useAppState = () => {
  const context = useContext(AppContext);
  const [state, setState] = useCreateState<AppStateInterface>({ ...context });

  // Verify if app is authenticated
  useEffect(() => {
    let mounted = true;
    const settings = getGlobalSettings();
    const { client_id } = settings;

    const notAuthenticated = () => {
      if (!mounted) return;
      return setState({
        authenticated: false,
        signedin: false,
        status: Status.loaded,
      });
    };

    if (!client_id) {
      // App does not have settings to be authenticated. Redirect user for authentication
      return notAuthenticated();
    } else {
      // Verify if authentication is valid
      authenticate()
        .then(async () => {
          // App authenticated, check if user is logged in
          subscribeUserSignedStatus((signedin: boolean) => {
            if (!mounted) return;
            return setState({
              signedin,
            });
          });

          const accounts = settings.accounts.reduce(
            (acc: AppStateInterface['accounts'], curr) => {
              return {
                ids: [...acc.ids, curr],
                entities: {
                  ...acc.entities,
                  [curr]: {
                    title: '',
                    spreadsheetId: curr,
                    initialised: false,
                    loading: false,
                    error: false,
                  },
                },
              };
            },
            { ids: [], entities: {} }
          );

          return setState({
            status: Status.loaded,
            authenticated: true,
            signedin: isSignedIn(),
            accounts,
          });
        })
        .catch((reason) => {
          if (!mounted) return;
          setAlert(reason, 'danger');
          notAuthenticated();
        });
    }

    return () => {
      mounted = false;
    };
  }, [setState]);

  const onAddAccount = async (spreadsheetId: string) => {
    const details = await initialiseDatabase([spreadsheetId]);
    const accounts = details.reduce(
      (acc, curr) => {
        return {
          ids: [...acc.ids, curr.spreadsheetId],
          entities: {
            ...acc.entities,
            [curr.spreadsheetId]: { ...curr },
          },
        };
      },
      { ...state.accounts }
    );

    const globalSettings = getGlobalSettings();
    setGlobalSettings({
      accounts: [...globalSettings.accounts, spreadsheetId],
    });
    setState({ accounts });
  };

  return {
    state,
    onAddAccount,
  };
};

export const useAppContext = () => {
  return useContext(AppContext);
};
