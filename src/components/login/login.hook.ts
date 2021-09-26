import { useEffect } from 'react';
import { useStateStatus } from '../../util/use-state-status';
import {
  handleSignin,
  handleSignout,
  isAppAuthenticated,
  subscribeUserStatus,
} from '../settings/settings.service';
import { Status } from '../statuses/statuses.interface';

export const useLoginState = () => {
  const [state, setState] = useStateStatus({
    authenticated: false,
    signedin: false,
  });

  const onAuthenticate = () => {
    setState({ authenticated: true });
  };

  useEffect(() => {
    let mounted = true;

    const execute = async () => {
      try {
        const { isSignedIn } = await isAppAuthenticated();
        if (!mounted) return;
        setState({
          status: Status.loaded,
          authenticated: true,
          signedin: isSignedIn,
        });
      } catch (error) {
        if (!mounted) return;
        return setState({ status: Status.loaded });
      }
    };

    execute();
    return () => {
      mounted = false;
    };
  }, [setState]);

  useEffect(() => {
    let mounted = true;
    subscribeUserStatus((signedin) => {
      if (!mounted) return;
      setState({ signedin });
    });
    return () => {
      mounted = false;
    };
  }, [setState]);

  return {
    state,
    onAuthenticate,
    handleSignin,
    handleSignout,
  };
};
