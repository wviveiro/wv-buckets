import React, { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { wvbucket } from '../buckets/buckets.interface';
import { transformRowsIntoOptions } from '../buckets/buckets.service';
import { addSheetRows, getSheet } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { AddRowStateInterface } from './add-row.interface';
import { format } from 'date-fns';
import { OptionType } from '../../util/option.interface';

export const AddRowState = () => {
  const [state, setState] = useCreateState<AddRowStateInterface>({
    status: Status.initializing,
    categories: [],
    category: null,
    date: '',
    message: '',
    amount: 0,
  });
  const disabled = state.status !== Status.loaded;

  const handleCategoryChange = (option: OptionType | null) => {
    setState({ category: option });
  };

  const changeField = (field: keyof AddRowStateInterface) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      setState({ [field]: ev.target.value });
    };
  };

  const onSave = async () => {
    const required: (keyof AddRowStateInterface)[] = [
      'category',
      'date',
      'amount',
    ];
    const invalid = required.find((field) => !state[field]);
    if (invalid) return alert('Category, date and amount are required fields');
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
      return alert('Something went wrong trying to save the data');
    }

    const now = new Date();
    setState({
      status: Status.loaded,
      category: null,
      date: format(now, 'yyyy-MM-dd'),
      message: '',
      amount: 0,
    });
    alert('Data saved successfully');
  };

  useEffect(() => {
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
        alert(reason.message);
      });
  }, [setState]);

  return {
    disabled,
    state,
    handleCategoryChange,
    changeField,
    onSave,
  };
};
