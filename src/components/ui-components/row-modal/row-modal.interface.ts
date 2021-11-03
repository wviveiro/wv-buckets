import { EntityId } from '@reduxjs/toolkit';

export interface RowControllerArgs {
  account_id: EntityId;
  category?: string;
  date?: string;
  description?: string;
  type?: 'income' | 'expense';
}
