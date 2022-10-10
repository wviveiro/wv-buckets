export interface LoadGoogleProps {
  onLoadToken: (access_token: string) => void;
  onLoadClient: (client: google.accounts.oauth2.TokenClient) => void;
}
