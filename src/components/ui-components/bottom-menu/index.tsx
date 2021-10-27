import React from 'react';
import { BottomModal } from '../bottom-modal';
import { useBottomMenuState } from './bottom-menu.hook';
import { BottomMenuProps } from './bottom-menu.interface';

export const BottomMenu: React.FC<BottomMenuProps> = (props) => {
  const { state, onClose } = useBottomMenuState(props);

  if (state.closed) return null;

  return (
    <BottomModal
      show={props.show}
      onClose={onClose}
      menu={[
        [{ label: 'Menu 1' }, { label: 'Menu 2' }, { label: 'Menu 3' }],
        [{ label: 'Cancel' }],
      ]}
    >
      Test
    </BottomModal>
  );
};
