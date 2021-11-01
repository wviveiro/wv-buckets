import { useMemo } from 'react';
import useCreateState from 'react-hook-setstate';

export const useRowModal = () => {
  const [state, setState] = useCreateState({
    type: 'income',
  });

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Other', value: 'other' },
  ];

  const selectedType = useMemo(() => {
    const foundIndex = typeOptions.findIndex(
      (option) => option.value === state.type
    );

    if (foundIndex < 0) return undefined;
    return foundIndex;
  }, [state.type, typeOptions]);

  const onSelectType = (type: string) => {
    return () => {
      setState({ type });
    };
  };

  return {
    state,
    selectedType,
    typeOptions,
    onSelectType,
  };
};
