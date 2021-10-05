import { createContext, useCallback, useContext, useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { useHistory } from 'react-router-dom';
import { setAlert } from '../alert';
import { wvbucket, WvBucketRow } from '../buckets/buckets.interface';
import {
  getGapi,
  getGlobalSettings,
  isAppAuthenticated,
  subscribeUserStatus,
} from '../settings';
import { getSheetDetails } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { MainContextState, Stages } from './main-provider.interface';

export const MainContext = createContext<MainContextState>({
  status: Status.initializing,
  stage: Stages.authenticating,
  spreadsheetId: '',
  authenticated: false,
  signedin: false,
  rows: [],
});

export const useMainContextState = () => {
  const globalSettings = getGlobalSettings();
  const history = useHistory();
  const [state, setState] = useCreateState<MainContextState>({
    status: Status.initializing,
    stage: Stages.authenticating,
    spreadsheetId: globalSettings.spid,
    authenticated: false,
    signedin: false,
    rows: [],
  });

  const initialiser = useCallback(
    async (_mounted: boolean | (() => boolean) = true) => {
      const mounted = typeof _mounted === 'function' ? _mounted() : _mounted;
      try {
        const auth = await isAppAuthenticated(true);

        if (!auth.isAuthenticated || !auth.isSignedIn) {
          return setState({
            status: Status.loaded,
            authenticated: auth.isAuthenticated,
            signedin: auth.isSignedIn,
          });
        }

        subscribeUserStatus((signedin) => {
          if (!mounted) return;
          setState({ signedin });
        });

        setState({ stage: Stages.loadWvBuckets });

        const wvBucketSheet = await getSheetDetails<WvBucketRow>(
          state.spreadsheetId,
          wvbucket
        );

        if (!wvBucketSheet) {
          return setState({
            status: Status.loaded,
            error: 'Not possible to load wv bucket sheet',
          });
        }

        setState({
          wvbucketId: wvBucketSheet.properties.sheetId,
          status: Status.loaded,
          authenticated: true,
          signedin: true,
        });
      } catch (error) {
        setAlert(error, 'danger');

        return setState({
          status: Status.loaded,
          authenticated: false,
          signedin: false,
        });
      }
    },
    [setState, history, state.spreadsheetId]
  );

  useEffect(() => {
    let mounted = true;

    initialiser(() => mounted);
    return () => {
      mounted = false;
    };
  }, []);

  return {
    state: {
      ...state,
      initialiser,
    },
  };
};

export const useMainProvider = () => {
  const provider = useContext(MainContext);

  return provider;
};
