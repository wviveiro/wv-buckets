import { useLayoutEffect, useState } from 'react';
import { BottomModalProps } from './bottom-modal.interface';
import { bottomModalTransitionMilliseconds } from './bottom-modal.styled';

export const useBottomModalState = (props: BottomModalProps) => {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  const { show: open, onClose } = props;

  useLayoutEffect(() => {
    let mounted = true;
    if (open && !render && !show) {
      setRender(true);
    } else if (open && render && !show) {
      setTimeout(() => {
        if (!mounted) return;
        setShow(true);
      }, 1);
    } else if (!open && render && show) {
      setShow(false);
    } else if (!open && render && !show) {
      setTimeout(() => {
        if (!mounted) return;
        setRender(false);
        if (onClose) onClose();
      }, bottomModalTransitionMilliseconds);
    }

    return () => {
      mounted = false;
    };
  }, [open, render, show, onClose]);

  return { show, render };
};
