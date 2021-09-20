import { SheetSchema } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';

export interface WvBucketRow {
  date: string;
  amount: number;
  category: string;
  message: string;
}

export interface BucketsStateInterface {
  status: Status;
  rows: BucketEntity;
  search: string;
}

export const wvbucket: SheetSchema<WvBucketRow> = {
  name: 'WVBUCKET',
  columns: [
    { label: 'Date', name: 'date' },
    { label: 'Amount', name: 'amount', type: 'number' },
    { label: 'Category', name: 'category' },
    { label: 'Message', name: 'message' },
  ],
};

export interface BucketEntity {
  ids: string[];
  entities: {
    [key: string]: {
      amount: number;
    };
  };
}
