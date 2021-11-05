import { SchemaBuilder } from './schemas.interface';

import {
  WVBucketInterface,
  WVBucketSchema,
} from './wvbuckets/wvbuckets.interface';

export type SchemaTypes = WVBucketInterface;
export enum EnumSchemas {
  WVBUCKET = 'WVBUCKET',
}

export interface SchemaInterface {
  name: EnumSchemas;
  schema: SchemaBuilder<SchemaTypes>;
}

/**
 * Build Application database
 */
export type DatabaseInterface = {
  [key in EnumSchemas]: {
    id: string | number;
    rows: SchemaTypes[];
  };
};

/**
 * All schemas to build application
 */
export const Schemas: SchemaInterface[] = [
  {
    name: EnumSchemas.WVBUCKET,
    schema: WVBucketSchema,
  },
];

export type SheetProperties = gapi.client.sheets.SheetProperties;
