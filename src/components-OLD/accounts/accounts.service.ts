import { getGlobalSettings } from '../settings';
import { getSpreadsheetDetails } from '../sheet-api';
import { AccountsStatesInterface } from './accounts.interface';

export const initialiseAccounts = async (
  callback: (state: Partial<AccountsStatesInterface>) => void
) => {
  const globalSettings = getGlobalSettings();

  const state: Partial<AccountsStatesInterface> = {
    defaultAccount: globalSettings.spid,
    spreadsheets: {},
    accounts: [],
  };

  if (globalSettings.accounts) {
    for (const i of globalSettings.accounts) {
      console.log('--->0009');
      const account = await getSpreadsheetDetails(i);
      (state.accounts as string[]).push(i);
      console.log('00004', state);
      (state.spreadsheets as AccountsStatesInterface['spreadsheets'])[i] = {
        title: account.result.properties.title,
      };
    }
  }

  return callback(state);
};
