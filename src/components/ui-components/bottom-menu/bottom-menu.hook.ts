import { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { BottomMenuProps } from './bottom-menu.interface';

export const useBottomMenuState = (props: BottomMenuProps) => {
  const [state, setState] = useCreateState({
    closed: true,
  });

  useEffect(() => {
    if (props.show && state.closed) {
      setState({ closed: false });
    }
  }, [props.show, state.closed]);

  const onClose = () => {
    setState({ closed: true });
  };

  return { state, onClose };
};
