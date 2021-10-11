import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { BottomModalProps } from './bottom-modal.interface';
import { bottomModalTransitionMilliseconds } from './bottom-modal.styled';

export const useBottomModalState = (props: BottomModalProps) => {
  const [state, setState] = useStateStatus({
    show: false,
  });

  useEffect(() => {
    if (state.show === props.show) return;
    setState({ show: props.show });

    setTimeout(() => {
      if (props.show && props.onOpen) {
        props.onOpen();
      } else if (!props.show && props.onClose) {
        props.onClose();
      }
    }, bottomModalTransitionMilliseconds);
  }, [props.show, setState, state.show, props.onClose, props.onOpen]);

  return { state };
};
