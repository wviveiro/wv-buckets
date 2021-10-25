import * as React from 'react';
import { AccountState } from './account.hook';
import { AccountProps } from './account.interface';
import { AccountContainer } from './account.styled';

export const Account: React.FC<AccountProps> = (props) => {
  const { account } = AccountState(props);

  if (!account.initialised) {
    return (
      <AccountContainer>
        <div className="loading-account">
          <i className="fas fa-fan fa-spin splash-screen-spinner" />
          <p>Loading Account</p>
          <p>{account.spreadsheetId}</p>
        </div>
      </AccountContainer>
    );
  }

  return (
    <AccountContainer>
      <div className="icon-area"></div>
      <div className="account-details">
        <h4>{account.title}</h4>
      </div>
    </AccountContainer>
  );
};
