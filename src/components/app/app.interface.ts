import { DatabaseInterface } from 'components/schemas';
import { Status } from 'components/util/status';

export interface AppStateInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
  accounts: {
    initialised: boolean;
    loading: boolean;
    error: false | string;
    entries: AccountInterface[];
  };
}

export interface AppContextInterface extends AppStateInterface {
  onAddAccount: (account: AccountInterface) => void;
}

export interface AccountInterface {
  title: string;
  spreadsheetId: string;
  schemas?: DatabaseInterface;
}
