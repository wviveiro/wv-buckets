import {
  GlobalEnum,
  GlobalSettingsInterface,
} from './global-settings.interface';

/**
 * Get global settings from local storage
 */
export const getGlobalSettings = (): GlobalSettingsInterface => {
  const defaultSettings: GlobalSettingsInterface = {
    apikey: '',
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    spid: '',
    accounts: [],
    access_token: '',
    wvid: '',
  };

  const strGlobalSettings = localStorage.getItem(GlobalEnum.name);
  if (!strGlobalSettings) return defaultSettings;
  const globalSettings: GlobalSettingsInterface = JSON.parse(strGlobalSettings);
  if (!globalSettings) return defaultSettings;
  return globalSettings;
};

/**
 * Save changes on global settings in local storage
 */
export const saveGlobalSettings = (globalSettings: GlobalSettingsInterface) => {
  localStorage.setItem(GlobalEnum.name, JSON.stringify(globalSettings));
};

/**
 * Remove local storage
 */
export const deleteGlobalSettings = () => {
  localStorage.removeItem(GlobalEnum.name);
};

export const setGlobalSettings = (state: Partial<GlobalSettingsInterface>) => {
  const globalSettings = {
    ...getGlobalSettings(),
    ...state,
  };

  saveGlobalSettings(globalSettings);
};
