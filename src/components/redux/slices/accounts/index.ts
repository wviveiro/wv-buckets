import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from '@reduxjs/toolkit';
import { EnumSchemas } from 'components/schemas';
import {
  AccountInterface,
  AddTransactionInterface,
} from './accounts.interface';

const accountsAdapter = createEntityAdapter<AccountInterface>({
  selectId: (account) => account.spreadsheetId,
});

const accountSlice = createSlice({
  name: 'account',
  initialState: accountsAdapter.getInitialState(),
  reducers: {
    /**
     * Import is the process of adding the accounts not initialised yet
     */
    importAccounts: (state, action: PayloadAction<string[]>) => {
      const accounts = action.payload.map((spreadsheetId) => ({
        title: '',
        spreadsheetId,
        initialised: false,
        loading: false,
        error: false,
      }));

      accountsAdapter.upsertMany(state, accounts);
    },
    /**
     * Set account as loading
     */
    startLoadingAccount: (
      state,
      { payload: spreadsheetId }: PayloadAction<EntityId>
    ) => {
      const entity = state.entities[spreadsheetId];
      if (entity) {
        entity.loading = true;
        entity.error = false;
      }
    },
    loadAccounts: (state, { payload }: PayloadAction<AccountInterface[]>) => {
      accountsAdapter.upsertMany(state, payload);
    },
    removeAccount: (state, { payload }: PayloadAction<EntityId>) => {
      accountsAdapter.removeOne(state, payload);
    },
    addTransactionAccount: (
      state,
      { payload }: PayloadAction<AddTransactionInterface>
    ) => {
      state.entities[payload.accountid]?.schemas?.[
        EnumSchemas.WVBUCKET
      ].rows.push(payload.transaction);
    },
  },
});

export const {
  importAccounts,
  startLoadingAccount,
  loadAccounts,
  removeAccount,
  addTransactionAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
