import React from 'react';
import { BlackModal } from '../black-modal/black-modal';
import BottomModal from '../bottom-modal';
import { RowModalContext } from './context/row-modal-context';
import { useRowModal } from './row-modal.hook';
import { RowModalContainer } from './row-modal.styled';
import { AddCategory } from './views/add-category/add-catagory';
import { RowMainView } from './views/main/main';
import { SelectAccount } from './views/select-account/select-account';
import { SelectCategory } from './views/select-category/select-category';

export const RowModal: React.FC = () => {
  const value = useRowModal();
  const {
    state: { open, openAccountList, openCategoryList, openAddCategory },
  } = value;

  return (
    <RowModalContainer>
      <RowModalContext.Provider value={value}>
        <BlackModal open={open}>
          <RowMainView />
        </BlackModal>
        <BlackModal open={openAccountList} noBackground={true}>
          <SelectAccount />
        </BlackModal>
        <BlackModal open={openCategoryList} noBackground={true}>
          <SelectCategory />
        </BlackModal>
        <BottomModal show={openAddCategory}>
          <AddCategory />
        </BottomModal>
      </RowModalContext.Provider>
    </RowModalContainer>
  );
};
