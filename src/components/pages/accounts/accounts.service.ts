import {
  getGlobalSettings,
  setGlobalSettings,
} from 'components/global-settings';

/**
 * Add account to global settings
 */
export const onAddAccount = (spreadsheetId: string) => {
  const settings = getGlobalSettings();
  const accounts = [...settings.accounts, spreadsheetId];
  setGlobalSettings({ accounts });
};

/**
 * Add account to global settings
 */
export const onDeleteAccount = (spreadsheetId: string) => {
  // Remove from the storage
  const settings = getGlobalSettings();
  const accounts = settings.accounts.filter((id) => id !== spreadsheetId);
  setGlobalSettings({ accounts });
};

/**
 * Verify if account already exists
 */
export const accountExists = (spreadsheetId: string) => {
  const settings = getGlobalSettings();
  return settings.accounts.find((account) => account === spreadsheetId);
};
