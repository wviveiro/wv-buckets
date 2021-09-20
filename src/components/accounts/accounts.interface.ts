import { Status } from '../statuses/statuses.interface';

export interface AccountsStatesInterface {
  status: Status;
  defaultAccount: string;
  accounts: string[];
  spreadsheets: {
    [key: string]: {
      title: string;
    };
  };
  addAccountModal: boolean;
  newaccount: string;
}
