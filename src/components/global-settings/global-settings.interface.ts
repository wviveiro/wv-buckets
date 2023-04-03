export interface GlobalSettingsInterface {
  /** API KEY from google console https://console.developers.google.com */
  apikey: string;
  /** Client ID from OAUTH from google console https://console.developers.google.com */
  client_id: string;
  /** spreadsheet ID from the used spreadsheet */
  spid: string;
  /** list of spreadsheet IDs */
  accounts: string[];
  /** Access token from google */
  access_token: string;
  /** Id received from wvbucket authentication */
  wvid: string;
}

export enum GlobalEnum {
  name = 'wvbucketSettings',
}
