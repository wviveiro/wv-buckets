import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from 'components/util/status';
import { AuthInterface } from './auth.interface';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: Status.initializing,
    authenticated: false,
    signedin: false,
  },
  reducers: {
    setAuth: (state, { payload }: PayloadAction<Partial<AuthInterface>>) => {
      if (Object.prototype.hasOwnProperty.call(payload, 'status')) {
        state.status = payload.status as Status;
      }

      if (Object.prototype.hasOwnProperty.call(payload, 'authenticated')) {
        state.authenticated = payload.authenticated as boolean;
      }

      if (Object.prototype.hasOwnProperty.call(payload, 'signedin')) {
        state.signedin = payload.signedin as boolean;
      }
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
