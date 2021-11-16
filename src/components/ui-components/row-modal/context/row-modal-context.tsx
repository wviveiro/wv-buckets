import { asyncNoop, noop } from 'components/util/noop';
import { Status } from 'components/util/status';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { RowModalContextInterface } from './row-modal-context.interface';

export const DefaultState = {
  status: Status.loaded,
  open: false,
  openAccountList: false,
  openCategoryList: false,
  openAddCategory: false,
  openDatePicker: false,
  type: 'expense',
  amount: '0',
  message: '',
  view: 'main',
  date: format(new Date(), 'yyyy-MM-dd'),
  account_id: '',
  category: '',
};

export const RowModalContext = React.createContext<RowModalContextInterface>({
  state: {
    ...DefaultState,
    disabled: false,
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
  onSave: asyncNoop,
});

export const useRowModalContext = () => {
  return useContext(RowModalContext);
};
