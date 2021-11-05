import { SchemaBuilder } from '../schemas.interface';

export interface WVBucketInterface {
  date: string;
  amount: number;
  category: string;
  message: string;
}

export const WVBucketSchema: SchemaBuilder<WVBucketInterface> = {
  date: { label: 'Date' },
  amount: { label: 'Amount', type: 'number' },
  category: { label: 'Category' },
  message: { label: 'Message' },
};
