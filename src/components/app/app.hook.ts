import { setAlert } from 'components/alert';
import { getGlobalSettings } from 'components/global-settings';
import { authenticate, subscribeUserSignedStatus } from 'components/sheet-api';
import { Status } from 'components/util/status';
import { createContext, useContext, useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { AppContextInterface } from './app.interface';

export const AppContext = createContext<AppContextInterface>({
  status: Status.initializing,
  authenticated: false,
  signedin: false,
});

export const useAppState = () => {
  const context = useContext(AppContext);
  const [state, setState] = useCreateState<AppContextInterface>({ ...context });

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
        .then(() => {
          // App authenticated, check if user is logged in
          subscribeUserSignedStatus((signedin) => {
            if (!mounted) return;
            return setState({
              authenticated: true,
              signedin,
              status: Status.loaded,
            });
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

  return {
    state,
  };
};
