import React, { useContext } from 'react';
import { RowModalContextInterface } from './row-modal-context.interface';

export const RowModalContext = React.createContext<RowModalContextInterface>({
  state: {
    open: false,
    openAccountList: false,
    type: 'expense',
    amount: '0',
    message: '',
    date: '',
    view: 'main',
    account_id: '',
    category: '',
  },
  typeOptions: [],
  decimal: '0',
  integer: '00',
  accounts: {
    ids: [],
    entities: {},
  },
  onSelectType: () => {
    // Not Implemented
  },
  onKeyPressAmount: () => {
    // Not Implemented
  },
  onSetDescription: () => {
    // Not Implemented
  },
  setState: () => {
    // Not Implemented
  },
  onSelectAccount: () => {
    // Not Implemented
  },
  selectedAccount: undefined,
});

export const useRowModalContext = () => {
  return useContext(RowModalContext);
};
