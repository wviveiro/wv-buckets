import React from 'react';
import { RowModalContext } from './context/row-modal-context';
import { useRowModal } from './row-modal.hook';
import { RowModalContainer } from './row-modal.styled';
import { RowMainView } from './views/main/main';
import { SelectAccount } from './views/select-account/select-account';

export const RowModal: React.FC = () => {
  const value = useRowModal();
  const {
    state: { view },
  } = value;

  return (
    <RowModalContainer>
      <RowModalContext.Provider value={value}>
        {view === 'select-account' ? <SelectAccount /> : <RowMainView />}
      </RowModalContext.Provider>
    </RowModalContainer>
  );
};
