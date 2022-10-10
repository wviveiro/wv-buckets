import { createHook, createStore, type Action } from "react-sweet-state";
import { setGlobalSettings } from "../../utils/global-settings";
import { onLoadGoogle } from "./load-google";
import type { OnReceiveAccessTokenProps, State } from "./types";

export const initialState: State = {
  access_token: "",
  loading: false,
};

const store = createStore({
  initialState,
  actions: {
    initLoadGoogle:
      (): Action<State> =>
      ({ setState }) => {
        setState({ loading: true });
      },
    onReceiveAccessToken:
      ({ access_token }: OnReceiveAccessTokenProps): Action<State> =>
      ({ setState }) => {
        setState({ access_token, loading: false });
      },
  },
  name: "google-auth",
});

export const useGoogleAuthStore = createHook(store);

export const useGoogleAuth = () => {
  const [{ loading, access_token }, { initLoadGoogle, onReceiveAccessToken }] =
    useGoogleAuthStore();

  const loadGoogle = () => {
    initLoadGoogle();
    onLoadGoogle({
      onLoadClient: (client) => {
        client.requestAccessToken();
      },
      onLoadToken: (access_token) => {
        setGlobalSettings({ access_token });
        onReceiveAccessToken({ access_token });
      },
    });
  };

  return {};
};
