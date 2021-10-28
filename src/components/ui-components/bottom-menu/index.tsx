import React from 'react';
import { BottomModal } from '../bottom-modal';
import { useBottomMenuState } from './bottom-menu.hook';
import { BottomMenuProps } from './bottom-menu.interface';

export const BottomMenu: React.FC<BottomMenuProps> = (props) => {
  const { show, closed, onClose } = useBottomMenuState(props);

  if (closed) return null;

  return (
    <BottomModal show={show} onClose={onClose} menu={props.menu}>
      {props.children}
    </BottomModal>
  );
};
