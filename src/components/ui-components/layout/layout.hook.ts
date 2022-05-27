import {
  deleteGlobalSettings,
  setGlobalSettings,
} from 'components/global-settings';
import { setAuth } from 'components/redux/slices/auth';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onConfirm } from '../confirm-modal/confirm-modal';

export const useLayoutState = () => {
  const [state, setState] = useStateStatus({
    status: Status.loaded,
    sideMenu: false,
    width: window.innerWidth,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const onResize = () => {
      if (!mounted) return;
      setState({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', onResize);
    };
  }, [setState]);

  const toggleSideMenu = (sideMenu?: boolean) => {
    return () => {
      setState({
        sideMenu: sideMenu !== undefined ? sideMenu : !state.sideMenu,
      });
    };
  };

  const onSignout = () => {
    setGlobalSettings({ access_token: '' });
    dispatch(setAuth({ signedin: false }));
  };

  const confirmDeleteSettings = () => {
    onConfirm({
      description:
        'All data of the application will be deleted, but the spreadsheets will be kept under your google account',
      onConfirm: () => {
        deleteGlobalSettings();
        window.location.reload();
      },
    });
  };

  return {
    state,
    toggleSideMenu,
    onSignout,
    confirmDeleteSettings,
  };
};
