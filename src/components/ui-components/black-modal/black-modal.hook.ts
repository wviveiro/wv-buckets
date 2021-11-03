import { useLayoutEffect, useState } from 'react';
import { BlackModalProps } from './black-modal.interface';
import { blackModalTransitionTime } from './black-modal.styled';

export const useBlackModalState = (props: BlackModalProps) => {
  const { open } = props;

  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

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
      }, blackModalTransitionTime);
    }

    return () => {
      mounted = false;
    };
  }, [open, render, show]);

  return {
    show,
    render,
  };
};
