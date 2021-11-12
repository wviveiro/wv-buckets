import { noop } from 'components/util/noop';
import React, { useContext } from 'react';
import { RowModalContextInterface } from './row-modal-context.interface';

export const RowModalContext = React.createContext<RowModalContextInterface>({
  state: {
    open: false,
    openAccountList: false,
    openCategoryList: false,
    openAddCategory: false,
    openDatePicker: false,
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
  multipleAccounts: false,
  selectedAccount: undefined,
  accountBuckets: { ids: [], buckets: {} },
  accountBalance: 0,
  onSelectType: noop,
  onKeyPressAmount: noop,
  onSetDescription: noop,
  setState: noop,
  onSelectAccount: noop,
});

export const useRowModalContext = () => {
  return useContext(RowModalContext);
};
