import { EntityId } from '@reduxjs/toolkit';
import {
  EnumSchemas,
  WVBucketInterface,
  WVBucketSchema,
} from 'components/schemas';
import { addSheetRows } from 'components/sheet-api';

export const addTransaction = (
  accountid: EntityId,
  transaction: WVBucketInterface
) => {
  const row = Object.keys(WVBucketSchema).map((key) => {
    return `${transaction[key as keyof WVBucketInterface]}`;
  });

  return addSheetRows(accountid as string, EnumSchemas.WVBUCKET, [row]);
};
