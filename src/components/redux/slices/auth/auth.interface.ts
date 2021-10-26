import { Status } from 'components/util/status';

export interface AuthInterface {
  status: Status;
  authenticated: boolean;
  signedin: boolean;
}
