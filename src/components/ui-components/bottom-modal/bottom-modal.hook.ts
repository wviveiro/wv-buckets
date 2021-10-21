import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { BottomModalProps } from './bottom-modal.interface';
import { bottomModalTransitionMilliseconds } from './bottom-modal.styled';

export const useBottomModalState = (props: BottomModalProps) => {
  const [state, setState] = useStateStatus({
    show: false,
  });

  const { show, onOpen, onClose } = props;

  useEffect(() => {
    if (state.show === show) return;
    setState({ show });

    setTimeout(() => {
      if (show && onOpen) {
        onOpen();
      } else if (!show && onClose) {
        onClose();
      }
    }, bottomModalTransitionMilliseconds);
  }, [show, setState, state.show, onClose, onOpen]);

  return { state };
};
