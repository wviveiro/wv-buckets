import { EntityId } from '@reduxjs/toolkit';
import { DatabaseInterface, WVBucketInterface } from 'components/schemas';

export interface AccountInterface {
  title: string;
  spreadsheetId: string;
  schemas?: DatabaseInterface;
  initialised: boolean;
  loading: boolean;
  error: false | string;
}

export interface AddTransactionInterface {
  transaction: WVBucketInterface;
  accountid: EntityId;
}

export interface LoadAccountErrorInterface {
  spreadsheetId: string;
  error: false | string;
}
