import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useRowModalContext } from '../row-modal/context/row-modal-context';
import { DateModalProps } from './date-modal.interface';

export const useDateModalState = (props: DateModalProps) => {
  const { state, setState } = useRowModalContext();

  const [date, setDate] = useState(parseISO(state.date));

  useEffect(() => {
    if (state.openDatePicker) {
      setDate(parseISO(state.date));
    }
  }, [state.date, state.openDatePicker]);

  const onChange = (date: Date) => {
    setDate(date);
  };

  const onCancel = () => {
    setState({ openDatePicker: false });
  };

  const onAccept = () => {
    setState({ openDatePicker: false, date: format(date, 'yyyy-MM-dd') });
  };

  return {
    date,
    open: state.openDatePicker,
    onChange,
    onCancel,
    onAccept,
  };
};
