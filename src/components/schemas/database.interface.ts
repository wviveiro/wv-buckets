import { SchemaBuilder, SchemaInterface } from './schemas.interface';

import {
  WVBucketInterface,
  WVBucketSchema,
} from './wvbuckets/wvbuckets.interface';

export type SchemaTypes = WVBucketInterface;

/**
 * Build Application database
 */
export interface DatabaseInterface {
  [key: string]: SchemaInterface<SchemaTypes>;
}

/**
 * All schemas to build application
 */
export const Schemas: Array<SchemaBuilder<SchemaTypes>> = [WVBucketSchema];

export type SheetProperties = gapi.client.sheets.SheetProperties;
