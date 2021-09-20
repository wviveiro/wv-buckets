import { getGlobalSettings } from '../settings';
import { getSpreadsheetDetails } from '../sheet-api';
import { AccountsStatesInterface } from './accounts.interface';

export const initialiseAccounts = async (
  callback: (state: Partial<AccountsStatesInterface>) => void
) => {
  const globalSettings = getGlobalSettings();
  const defaultAccount = await getSpreadsheetDetails(globalSettings.spid);
  const state: Partial<AccountsStatesInterface> = {
    defaultAccount: globalSettings.spid,
    spreadsheets: {
      [globalSettings.spid]: {
        title: defaultAccount.result.properties.title,
      },
    },
    accounts: [],
  };

  if (globalSettings.accounts) {
    for (const i of globalSettings.accounts) {
      const account = await getSpreadsheetDetails(i);
      (state.accounts as string[]).push(i);
      (state.spreadsheets as AccountsStatesInterface['spreadsheets'])[i] = {
        title: account.result.properties.title,
      };
    }
  }

  return callback(state);
};
