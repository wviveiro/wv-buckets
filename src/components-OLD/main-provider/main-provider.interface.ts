import { WvBucketRow } from '../buckets/buckets.interface';
import { Status } from '../statuses/statuses.interface';

export enum Stages {
  authenticating = 'Authenticating',
  loadWvBuckets = 'Loading WvBuckets',
}

export interface MainContextState {
  status: Status;
  stage: Stages;
  spreadsheetId: string;
  wvbucketId?: number;
  authenticated: boolean;
  signedin: boolean;
  error?: string;
  rows: WvBucketRow[];
  initialiser?: () => void;
}
