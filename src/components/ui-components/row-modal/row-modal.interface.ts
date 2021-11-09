import { EntityId } from '@reduxjs/toolkit';

export interface RowControllerArgs {
  account_id: EntityId;
  category?: string;
  date?: string;
  description?: string;
  type?: 'income' | 'expense';
}

export interface RowModalStateInterface {
  open: boolean;
  openAccountList: boolean;
  type: string;
  amount: string;
  message: string;
  view: string;
  date: string;
  account_id: EntityId;
  category: string;
}
