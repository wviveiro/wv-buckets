import { Status } from 'components/util/status';

export interface MainStateInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
}
