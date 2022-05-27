import { setAlert } from 'components/alert';
import { getGlobalSettings } from 'components/global-settings';
import { getUserInfo } from 'components/google-api/google-api';
import { selectAuth } from 'components/redux/selectors/auth';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMainState = () => {
  const state = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const { access_token, client_id } = getGlobalSettings();

    if (!client_id) {
      dispatch(
        setAuth({
          status: Status.loaded,
          authenticated: false,
          signedin: false,
        })
      );
    }

    if (!access_token) {
      dispatch(
        setAuth({
          status: Status.loaded,
          authenticated: true,
          signedin: false,
        })
      );
    }

    getUserInfo()
      .then(() => {
        dispatch(
          setAuth({
            status: Status.loaded,
            authenticated: true,
            signedin: true,
          })
        );
      })
      .catch((error) => {
        setAlert(error);
        dispatch(
          setAuth({
            status: Status.loaded,
            authenticated: true,
            signedin: false,
          })
        );
      });
  }, [dispatch]);

  return {
    state,
  };
};
