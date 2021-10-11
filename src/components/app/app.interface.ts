import { Status } from 'components/util/status';

export interface AppStateInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
  accounts: AccountInterface[];
}

export interface AppContextInterface extends AppStateInterface {
  onAddAccount: (account: AccountInterface) => void;
}

export interface AccountInterface {
  title: string;
  spreadsheetId: string;
}
