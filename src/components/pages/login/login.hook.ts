import { setAlert } from 'components/alert';
import { setGlobalSettings } from 'components/global-settings';
import {
  requestToken,
  treatGoogleAPIError,
} from 'components/google/google-api/google-api';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useLoginState = () => {
  const [state] = useStateStatus<{
    status: Status;
  }>({
    status: Status.loaded,
  });
  const popup = useRef<Window | null>(null);
  const dispatch = useDispatch();

  const onLogin = async () => {
    const requestURL = new URL('request-oauth', process.env.REACT_APP_BACKEND);

    popup.current = window.open(
      requestURL.href,
      'loginpage',
      'width=400,height=500'
    );
  };

  useEffect(() => {
    const action = async (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        const { data } = event;

        if (data.authenticatedReceivedId) {
          if (popup.current) popup.current.close();

          try {
            const access_token = await requestToken(
              data.authenticatedReceivedId
            );
            setGlobalSettings({
              wvid: data.authenticatedReceivedId,
              access_token,
            });
            dispatch(
              setAuth({
                signedin: true,
              })
            );
          } catch (err) {
            setAlert(treatGoogleAPIError(err), 'danger');
          }
        }
      }
    };

    window.addEventListener('message', action);
    return () => {
      window.removeEventListener('message', action);
    };
  }, [dispatch]);

  return {
    state,
    onLogin,
  };
};
