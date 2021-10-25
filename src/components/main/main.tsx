import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from './account';
import { useMainState } from './main.hook';
import { MainContainer } from './main.styled';
import { ModalAddAccount } from './modal-add-account';
import { NoAccount } from './no-account';

export const Main: React.FC = () => {
  const { accounts, typeCreation } = useMainState();

  return (
    <MainContainer>
      {accounts.ids.length > 0 ? (
        <div className="inner-container">
          {accounts.ids.map((id, i) => {
            return <Account key={i} account={accounts.entities[id]} />;
          })}
        </div>
      ) : (
        <div className="inner-container">
          <NoAccount />
        </div>
      )}
      <div className="inner-container">
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
