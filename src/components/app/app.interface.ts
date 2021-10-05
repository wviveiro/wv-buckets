import { Status } from 'components/util/status';

export interface AppContextInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
}
