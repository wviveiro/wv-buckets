import { setAlert } from 'components/alert';
import { getGlobalSettings } from 'components/global-settings';
import {
  getUserInfo,
  treatGoogleAPIError,
} from 'components/google/google-api/google-api';
import { selectAuth } from 'components/redux/selectors/auth';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMainState = () => {
  const state = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const { access_token } = getGlobalSettings();
    if (!access_token) {
      dispatch(setAuth({ status: Status.loaded }));
      return;
    }

    const isAuthenticated = async () => {
      try {
        await getUserInfo();
        dispatch(
          setAuth({
            status: Status.loaded,
            signedin: true,
          })
        );
      } catch (err) {
        setAlert(treatGoogleAPIError(err), 'danger');
        dispatch(
          setAuth({
            status: Status.loaded,
            signedin: false,
          })
        );
      }
    };

    isAuthenticated();
  }, [dispatch]);

  return {
    state,
  };
};
