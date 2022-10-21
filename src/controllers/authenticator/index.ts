import { createHook, createStore } from "react-sweet-state";
import type { State } from "./types";
import { actions } from "./actions";

const initialState: State = {
  isAuthenticated: false,
  isInitialised: false,
  isLoading: false,
};

const store = createStore({
  initialState,
  actions,
});

export const useAuth = createHook(store);
