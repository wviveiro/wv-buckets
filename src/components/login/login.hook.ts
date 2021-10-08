import { setAlert } from 'components/alert';
import { onSignIn } from 'components/sheet-api';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';

export const useLoginState = () => {
  const [state, setState] = useStateStatus({
    status: Status.loaded,
  });

  const onLogin = async () => {
    setState({ status: Status.loading });

    try {
      await onSignIn();
    } catch (error) {
      console.error(error);
      setAlert('Something went wrong trying to log you in', 'danger');
    }

    setState({ status: Status.loaded });
  };

  return {
    state,
    onLogin,
  };
};
