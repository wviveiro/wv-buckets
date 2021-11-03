import { selectAccounts } from 'components/redux/selectors/accounts';
import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import useCreateState from 'react-hook-setstate';
import { useSelector } from 'react-redux';
import { TogglerOption } from '../toggler/toggler.interface';
import { RowModalContextStateInterface } from './context/row-modal-context.interface';
import { RowControllerArgs } from './row-modal.interface';

export const rowController = {
  open: (args: RowControllerArgs) => {
    // Not Implemented
  },
};

export const useRowModal = () => {
  const [state, setState] = useCreateState<RowModalContextStateInterface>({
    open: false,
    type: 'expense',
    amount: '0',
    message: '',
    view: 'main',
    date: format(new Date(), 'yyyy-MM-dd'),
    account_id: '',
    category: '',
  });

  const accounts = useSelector(selectAccounts);

  const accountDetails = useAccountDetails(state.account_id);

  const selectedAccount = accountDetails.account || undefined;

  // const selectedAccount = useMemo(() => {
  //   if (!state.account_id) return undefined;

  //   const found = accounts.ids.find((id) => id === state.account_id);

  //   if (!found) return undefined;

  //   return accounts.entities[found];
  // }, [accounts, state.account_id]);

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const formatedNumber = useMemo(() => {
    const amount = +state.amount;

    if (isNaN(amount)) return { decimal: '0', integer: '00' };

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

  useEffect(() => {
    rowController.open = (args: RowControllerArgs) => {
      setState({
        account_id: args.account_id,
        open: true,
        type: args.type || 'income',
        message: args.description || '',
        date: args.date || format(new Date(), 'yyyy-MM-dd'),
        category:
          args.category || accountDetails.buckets.ids.length > 0
            ? accountDetails.buckets.ids[0]
            : '',
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
    onSelectType,
    onKeyPressAmount,
    onSetDescription,
    setState,
  };
};
