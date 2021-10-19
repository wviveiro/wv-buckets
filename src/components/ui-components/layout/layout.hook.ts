import { deleteGlobalSettings } from 'components/global-settings';
import { onSignOut } from 'components/sheet-api';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { onConfirm } from '../confirm-modal/confirm-modal';

export const useLayoutState = () => {
  const [state, setState] = useStateStatus({
    status: Status.loaded,
    sideMenu: false,
    width: window.innerWidth,
  });

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
    onSignOut();
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
