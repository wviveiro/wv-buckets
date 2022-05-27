import {
  getGlobalSettings,
  setGlobalSettings,
} from 'components/global-settings';
import { getGoogle } from 'components/google/utils';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useLoginState = () => {
  const [state, setState] = useStateStatus<{
    status: Status;
    client?: google.accounts.oauth2.TokenClient;
  }>({
    status: Status.loaded,
    client: undefined,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const { client_id } = getGlobalSettings();
    const google = getGoogle();
    const client = google.accounts.oauth2.initTokenClient({
      client_id,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: ({ access_token }) => {
        setGlobalSettings({ access_token });
        dispatch(
          setAuth({
            signedin: true,
          })
        );
      },
    });
    setState({ client });
  }, [setState, dispatch]);

  const onLogin = async () => {
    if (state.client) state.client.requestAccessToken();
  };

  return {
    state,
    onLogin,
  };
};
