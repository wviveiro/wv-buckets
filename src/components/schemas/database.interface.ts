import { SchemaInterface, WVBucketInterface } from '.';

/**
 * Build Application database
 */
export interface DatabaseInterface {
  wvbucket: SchemaInterface<WVBucketInterface>;
}
