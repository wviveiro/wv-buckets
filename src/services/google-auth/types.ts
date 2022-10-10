export interface State {
  access_token: string;
  loading: boolean;
}

export interface OnReceiveAccessTokenProps {
  access_token: string;
}
