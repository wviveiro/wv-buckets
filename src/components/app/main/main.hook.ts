import { setAlert } from 'components/alert';
import { getGlobalSettings } from 'components/global-settings';
import { selectAuth } from 'components/redux/selectors/auth';
import { importAccounts } from 'components/redux/slices/accounts';
import { setAuth } from 'components/redux/slices/auth';
import {
  authenticate,
  hasSheetScope,
  isSignedIn,
  onSignOut,
  subscribeUserSignedStatus,
} from 'components/sheet-api';
import { Status } from 'components/util/status';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMainState = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectAuth);

  const setState = useCallback(
    (_state: Partial<typeof state>) => {
      dispatch(setAuth(_state));
    },
    [dispatch]
  );

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

          if (!hasSheetScope()) {
            setState({
              status: Status.loaded,
              authenticated: true,
              signedin: false,
            });
            return onSignOut();
          }

          dispatch(importAccounts(settings.accounts));

          return setState({
            status: Status.loaded,
            authenticated: true,
            signedin: isSignedIn(),
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
  }, [setState, dispatch]);

  // const onAddAccount = async (spreadsheetId: string) => {
  //   const details = await initialiseDatabase([spreadsheetId]);
  //   const accounts = details.reduce(
  //     (acc, curr) => {
  //       return {
  //         ids: [...acc.ids, curr.spreadsheetId],
  //         entities: {
  //           ...acc.entities,
  //           [curr.spreadsheetId]: { ...curr },
  //         },
  //       };
  //     },
  //     { ...state.accounts }
  //   );

  //   const globalSettings = getGlobalSettings();
  //   setGlobalSettings({
  //     accounts: [...globalSettings.accounts, spreadsheetId],
  //   });
  //   setState({ accounts });
  // };

  // const initialiseAccounts = async () => {
  //   const details = await initialiseDatabase(state.accounts.ids);
  //   const accounts = details.reduce(
  //     (acc, curr) => {
  //       return {
  //         ids: acc.ids.includes(curr.spreadsheetId)
  //           ? acc.ids
  //           : [...acc.ids, curr.spreadsheetId],
  //         entities: {
  //           ...acc.entities,
  //           [curr.spreadsheetId]: { ...curr },
  //         },
  //       };
  //     },
  //     { ...state.accounts }
  //   );

  //   console.log(accounts);
  //   setState({ accounts });
  // };

  return {
    state,
  };
};
