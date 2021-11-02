import useCreateState from 'react-hook-setstate';
import { TogglerOption } from '../toggler/toggler.interface';

export const useRowModal = () => {
  const [state, setState] = useCreateState({
    type: 'expense',
  });

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const onSelectType = ({ value: type }: TogglerOption) => {
    setState({ type: type as string });
  };

  return {
    state,
    typeOptions,
    onSelectType,
  };
};
