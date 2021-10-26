import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '../slices/accounts';
import authSlice from '../slices/auth';

export const store = configureStore({
  reducer: {
    accounts: accountSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
