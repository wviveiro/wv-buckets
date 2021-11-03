import { selectAccounts } from 'components/redux/selectors/accounts';
import React, { useEffect, useMemo } from 'react';
import useCreateState from 'react-hook-setstate';
import { useSelector } from 'react-redux';
import { TogglerOption } from '../toggler/toggler.interface';

export const rowController = {
  open: () => {
    // Not Implemented
  },
};

export const useRowModal = () => {
  const [state, setState] = useCreateState({
    open: false,
    type: 'expense',
    amount: '0',
    message: '',
    view: 'main',
  });

  const accounts = useSelector(selectAccounts);

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
    rowController.open = () => {
      setState({ open: true });
    };
  }, [setState]);

  return {
    state,
    typeOptions,
    decimal,
    integer,
    accounts,
    onSelectType,
    onKeyPressAmount,
    onSetDescription,
    setState,
  };
};
