import { Status } from '../statuses/statuses.interface';

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
  status: Status;
  errors: {
    [key in keyof SettingsInterface]?: string;
  };
}

export interface SettingsProps {
  onAuthenticate?: () => void;
}
