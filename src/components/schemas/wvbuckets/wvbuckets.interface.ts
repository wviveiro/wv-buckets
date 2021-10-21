import { SchemaBuilder } from '../schemas.interface';

export interface WVBucketInterface {
  date: string;
  amount: number;
  category: string;
  message: string;
}

export const WVBucketSchema: SchemaBuilder<WVBucketInterface> = {
  name: 'WVBUCKET',
  schema: {
    date: { label: 'Date' },
    amount: { label: 'Amount' },
    category: { label: 'Category' },
    message: { label: 'Message' },
  },
};
