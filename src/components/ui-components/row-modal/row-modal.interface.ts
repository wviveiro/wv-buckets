import { EntityId } from '@reduxjs/toolkit';
import { Status } from 'components/util/status';

export interface RowControllerArgs {
  account_id: EntityId;
  category?: string;
  date?: string;
  description?: string;
  type?: 'income' | 'expense';
}

export interface RowModalStateInterface {
  status: Status;
  open: boolean;
  openAccountList: boolean;
  openCategoryList: boolean;
  openAddCategory: boolean;
  openDatePicker: boolean;
  type: string;
  amount: string;
  message: string;
  view: string;
  date: string;
  account_id: EntityId;
  category: string;
}
