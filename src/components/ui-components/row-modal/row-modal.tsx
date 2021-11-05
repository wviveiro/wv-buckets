import React from 'react';
import { BlackModal } from '../black-modal/black-modal';
import { RowModalContext } from './context/row-modal-context';
import { useRowModal } from './row-modal.hook';
import { RowModalContainer } from './row-modal.styled';
import { RowMainView } from './views/main/main';

export const RowModal: React.FC = () => {
  const value = useRowModal();
  const {
    state: { open },
  } = value;

  return (
    <RowModalContainer>
      <RowModalContext.Provider value={value}>
        <BlackModal open={open}>
          <RowMainView />
        </BlackModal>
      </RowModalContext.Provider>
    </RowModalContainer>
  );
};
