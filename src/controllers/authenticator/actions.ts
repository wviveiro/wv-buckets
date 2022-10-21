import type { Action } from "react-sweet-state";
import { fetchGoogleApi } from "../../utils/fetch-api";
import { State } from "./types";

type ActionsSuite<TState> = {
  [key in string]: () => Action<TState>;
};

export const actions: ActionsSuite<State> = {
  checkIfLoggedIn:
    () =>
    async ({ dispatch }) => {
      try {
        await fetchGoogleApi("oauth2/v1/userinfo");
        dispatch(actions.authenticate());
      } catch (err) {
        console.error("Authetication error:", err);
        dispatch(actions.failAuthentication());
      }
    },
  initialise:
    () =>
    async ({ setState, dispatch }) => {
      setState({ isInitialised: true, isLoading: true });
      dispatch(actions.checkIfLoggedIn());
    },
  failAuthentication:
    () =>
    ({ setState }) => {
      setState({ isLoading: false, isAuthenticated: false });
    },
  authenticate:
    () =>
    ({ setState }) => {
      setState({ isLoading: false, isAuthenticated: true });
    },
};

export type Actions = typeof actions;
