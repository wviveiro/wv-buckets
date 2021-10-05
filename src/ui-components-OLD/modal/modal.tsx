import React from 'react';
import { ModalBox, ModalContainer } from './modal.styled';

export const Modal: React.FC = ({ children }) => {
  return (
    <ModalContainer>
      <ModalBox>{children}</ModalBox>
    </ModalContainer>
  );
};
