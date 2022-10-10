export interface GlobalSettingsInterface {
  /** Client ID from OAUTH from google console https://console.developers.google.com */
  client_id: string;
  /** list of spreadsheet IDs */
  accounts: string[];
  /** Access token from google */
  access_token: string;
}

export enum GlobalEnum {
  name = "wvbucketSettings",
}
