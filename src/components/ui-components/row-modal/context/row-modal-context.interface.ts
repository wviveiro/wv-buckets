import { EntityState } from '@reduxjs/toolkit';
import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';
import { TogglerOption } from 'components/ui-components/toggler/toggler.interface';
import React from 'react';

export interface RowModalContextStateInterface {
  type: string;
  amount: string;
  message: string;
  view: string;
}

export interface RowModalContextInterface {
  state: RowModalContextStateInterface;
  typeOptions: TogglerOption[];
  decimal: string;
  integer: string;
  accounts: EntityState<AccountInterface>;
  onSelectType: (option: TogglerOption) => void;
  onKeyPressAmount: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  onSetDescription: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  setState: (state: Partial<RowModalContextStateInterface>) => void;
}
