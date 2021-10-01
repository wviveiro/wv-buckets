import { useStateStatus } from '../../util/use-state-status';
import { useMainProvider } from '../main-provider';
import { handleSignin, handleSignout } from '../settings/settings.service';

export const useLoginState = () => {
  const state = useMainProvider();

  return {
    state,
    handleSignin,
    handleSignout,
  };
};
