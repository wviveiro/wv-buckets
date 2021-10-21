import { DatabaseInterface } from 'components/schemas';
import { Status } from 'components/util/status';

export interface AppStateInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
  accounts: {
    ids: string[];
    entities: {
      [key: string]: AccountInterface;
    };
  };
}

export interface AppContextInterface extends AppStateInterface {
  onAddAccount: (spreadsheetId: string) => void;
}

export interface AccountInterface {
  title: string;
  spreadsheetId: string;
  schemas?: DatabaseInterface;
  initialised: boolean;
  loading: boolean;
  error: boolean | string;
}
