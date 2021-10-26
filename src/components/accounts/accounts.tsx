import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';
import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from './account';
import { useAccountsState } from './accounts.hook';
import { AccountsContainer } from './accounts.styled';
import { ModalAddAccount } from './modal-add-account';
import { NoAccount } from './no-account';

export const Main: React.FC = () => {
  const { accounts, typeCreation } = useAccountsState();

  return (
    <AccountsContainer>
      {accounts.ids.length > 0 ? (
        <div className="inner-container accounts-list">
          {accounts.ids.map((id, i) => {
            if (!accounts.entities[id]) return null;
            return (
              <Account
                key={i}
                account={accounts.entities[id] as AccountInterface}
              />
            );
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
    </AccountsContainer>
  );
};
