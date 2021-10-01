export const bucketStorageName = 'wvbucketSettings';

export interface SettingsInterface {
  apikey: string;
  client_id: string;
  /** Default spreadsheet id */
  spid: string;
  /** Other spreadsheet ids to manage multiple accounts */
  accounts?: string[];
}

export interface SettingsStateInterface extends SettingsInterface {
  errors: {
    [key in keyof SettingsInterface]?: string;
  };
}

export interface SettingsProps {
  onAuthenticate?: () => void;
}

export interface GapiSubscription {
  gapi: any;
  unsubscribe: () => void;
}
