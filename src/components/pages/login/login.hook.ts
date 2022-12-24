import { setAlert } from 'components/alert';
import { setGlobalSettings } from 'components/global-settings';
import { loginFirebase } from 'components/google/firebase';
import { treatGoogleAPIError } from 'components/google/google-api/google-api';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useDispatch } from 'react-redux';

export const useLoginState = () => {
  const [state, setState] = useStateStatus<{
    status: Status;
  }>({
    status: Status.loaded,
  });
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setState({ status: Status.loading });
      const result = await loginFirebase();
      setState({ status: Status.loaded });

      setGlobalSettings({ access_token: result.token });
      dispatch(
        setAuth({
          signedin: true,
        })
      );
    } catch (error) {
      setState({ status: Status.loaded });
      setAlert(treatGoogleAPIError(error), 'danger');
    }
  };

  return {
    state,
    onLogin,
  };
};
