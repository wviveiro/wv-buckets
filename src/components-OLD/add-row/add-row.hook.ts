import React, { useEffect } from 'react';
import { wvbucket } from '../buckets/buckets.interface';
import { transformRowsIntoOptions } from '../buckets/buckets.service';
import { addSheetRows, getSheet } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { AddRowStateInterface } from './add-row.interface';
import { format } from 'date-fns';
import { OptionType } from '../../util/option.interface';
import { useStateStatus } from '../../util/use-state-status';
import { setAlert } from '../alert';

export const modalRow = {
  open: () => {
    // Not implemented
  },
};

export const AddRowState = () => {
  const [state, setState] = useStateStatus<AddRowStateInterface>({
    categories: [],
    category: null,
    date: '',
    message: '',
    amount: 0,
    open: false,
  });

  const handleCategoryChange = (option: OptionType | null) => {
    setState({ category: option });
  };

  const changeField = (field: keyof AddRowStateInterface) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      setState({ [field]: ev.target.value });
    };
  };

  const onClose = () => {
    setState({ open: false });
  };

  const onSave = async () => {
    const required: (keyof AddRowStateInterface)[] = [
      'category',
      'date',
      'amount',
    ];
    const invalid = required.find((field) => !state[field]);
    if (invalid)
      return setAlert('Category, date and amount are required fields');
    setState({ status: Status.loading });
    try {
      await addSheetRows(wvbucket, [
        [
          state.date,
          `${state.amount}`,
          `${state.category?.value}`,
          state.message,
        ],
      ]);
    } catch (error) {
      setState({ status: Status.loaded });
      return setAlert('Something went wrong trying to save the data', 'danger');
    }

    const now = new Date();
    setState({
      status: Status.loaded,
      category: null,
      date: format(now, 'yyyy-MM-dd'),
      message: '',
      amount: 0,
      open: false,
    });
    setAlert('Data saved successfully', 'success');
  };

  useEffect(() => {
    if (state.open) {
      setState({ status: Status.loading });

      getSheet(wvbucket)
        .then((rows) => {
          const now = new Date();
          setState({
            status: Status.loaded,
            categories: transformRowsIntoOptions(rows),
            date: format(now, 'yyyy-MM-dd'),
          });
        })
        .catch((reason) => {
          setAlert(reason.message, 'danger');
        });
    }
  }, [setState, state.open]);

  useEffect(() => {
    modalRow.open = () => {
      setState({ open: true });
    };
  }, [setState]);

  return {
    state,
    handleCategoryChange,
    changeField,
    onSave,
    onClose,
  };
};
