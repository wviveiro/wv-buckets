import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMainState } from './main.hook';
import { MainContainer } from './main.styled';
import { ModalAddAccount } from './modal-add-account';
import { NoAccount } from './no-account';

export const Main: React.FC = () => {
  const { typeCreation } = useMainState();

  return (
    <MainContainer className="flex">
      <div className="inner-container">
        <NoAccount />
        <Link
          to="/import-account"
          className="add-account-btn btn btn-secondary"
        >
          <i className="fas fa-plus" /> Add Account
        </Link>
      </div>
      {typeCreation && <ModalAddAccount type={typeCreation} />}
    </MainContainer>
  );
};
