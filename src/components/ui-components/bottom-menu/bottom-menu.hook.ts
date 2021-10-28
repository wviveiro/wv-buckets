import { useLayoutEffect, useState } from 'react';
import { BottomMenuProps } from './bottom-menu.interface';

export const useBottomMenuState = (props: BottomMenuProps) => {
  const [closed, setClosed] = useState(true);
  const [show, setShow] = useState(false);
  useLayoutEffect(() => {
    if (!show && props.show && closed) {
      setClosed(false);
    } else if (!show && props.show) {
      setShow(true);
    } else if (show && !props.show && !closed) {
      setShow(false);
    }
  }, [props.show, show, closed]);

  const onClose = () => {
    setClosed(true);
  };

  return { closed, show, onClose };
};
