export type RequestAccessToken =
  google.accounts.oauth2.TokenClient["requestAccessToken"];

export interface LoadGoogleArgs {
  onInitClient: (client: google.accounts.oauth2.TokenClient) => void;
  onAuthenticate: (access_token: string) => void;
}
