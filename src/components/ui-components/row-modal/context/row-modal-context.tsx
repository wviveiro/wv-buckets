import React, { useContext } from 'react';
import { RowModalContextInterface } from './row-modal-context.interface';

export const RowModalContext = React.createContext<RowModalContextInterface>({
  state: {
    type: 'expense',
    amount: '0',
    message: '',
    view: 'main',
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
});

export const useRowModalContext = () => {
  return useContext(RowModalContext);
};
