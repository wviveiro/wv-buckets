import { setAlert } from 'components/alert';
import { addTransaction } from 'components/helpers/add-transaction/add-transaction';
import { selectAccounts } from 'components/redux/selectors/accounts';
import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { addTransactionAccount } from 'components/redux/slices/accounts';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TogglerOption } from '../toggler/toggler.interface';
import { DefaultState } from './context/row-modal-context';
import {
  RowControllerArgs,
  RowModalStateInterface,
} from './row-modal.interface';

export const rowController = {
  open: (args: RowControllerArgs) => {
    // Not Implemented
  },
};

export const useRowModal = () => {
  const [state, setState] = useStateStatus<RowModalStateInterface>({
    ...DefaultState,
  });

  const dispatch = useDispatch();

  const accounts = useSelector(selectAccounts);

  const multipleAccounts = accounts.ids.length > 1;

  const accountDetails = useAccountDetails(state.account_id);

  const selectedAccount = accountDetails.account || undefined;
  const accountBalance = accountDetails.balance || 0;
  const accountBuckets = accountDetails.buckets || {};

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const formatedNumber = useMemo(() => {
    const amount = +state.amount;

    if (isNaN(amount)) return { decimal: '0', integer: '00' };

    if (amount < 100) {
      return {
        integer: `0`,
        decimal: `${amount}`.padStart(2, '0'),
      };
    }

    const stramount = `${amount}`;
    const decimal = stramount.substr(-2).padEnd(2, '0');
    const integer =
      stramount.length > 2
        ? (+stramount.substr(0, stramount.length - 2)).toLocaleString()
        : '0';

    return {
      decimal,
      integer,
    };
  }, [state.amount]);

  const { decimal, integer } = formatedNumber;

  const onSelectType = ({ value: type }: TogglerOption) => {
    setState({ type: type as string });
  };

  const onKeyPressAmount = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (ev.key === 'Backspace') {
      let amount = state.amount.substr(0, state.amount.length - 1);
      if (!amount) amount = '0';
      return setState({ amount });
    }

    if (!ev.key.match(/[0-9]/)) return;

    if (state.amount.length > 9) return;

    let amount = `${state.amount}${ev.key}`;

    setState({ amount });
  };

  const onSetDescription = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState({ message: ev.target.value });
  };

  const onSelectAccount = () => {
    setState({ openAccountList: true });
  };

  const onSave = async () => {
    if (!+state.amount) return setAlert('Amount is required', 'danger');
    if (!state.category) return setAlert('Category is required', 'danger');

    setState({ status: Status.loading });

    const amount = (+state.amount / 100) * (state.type === 'expense' ? -1 : 1);

    const transaction = {
      amount,
      category: state.category,
      message: state.message,
      date: state.date,
    };

    await addTransaction(state.account_id, transaction);
    dispatch(
      addTransactionAccount({ accountid: state.account_id, transaction })
    );

    setState({ ...DefaultState, status: Status.loaded, open: false });
    setAlert('Transaction added', 'success');
  };

  useEffect(() => {
    rowController.open = (args: RowControllerArgs) => {
      setState({
        account_id: args.account_id,
        open: true,
        type: args.type || 'income',
        message: args.description || '',
        date: args.date || format(new Date(), 'yyyy-MM-dd'),
        category: args.category,
      });
    };
  }, [setState]);

  return {
    state,
    typeOptions,
    decimal,
    integer,
    accounts,
    selectedAccount,
    multipleAccounts,
    accountBalance,
    accountBuckets,
    onSelectType,
    onKeyPressAmount,
    onSetDescription,
    onSelectAccount,
    setState,
    onSave,
  };
};
