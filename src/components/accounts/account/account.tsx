import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { AccountState } from './account.hook';
import { AccountProps } from './account.interface';
import { AccountContainer } from './account.styled';

export const Account: React.FC<AccountProps> = (props) => {
  const { account, onShowMenu } = AccountState(props);

  if (account.loading) {
    return (
      <AccountContainer>
        <div className="loading-account">
          <div>
            <i className="fas fa-fan fa-spin splash-screen-spinner" />
          </div>
          <p>Loading Account</p>
          <p>{account.spreadsheetId}</p>
        </div>
      </AccountContainer>
    );
  }

  if (account.error) {
    <AccountContainer>
      <span className="text-danger">{account.error}</span>
    </AccountContainer>;
  }

  if (!account.initialised) return null;

  return (
    <>
      <AccountContainer>
        <div className="icon-area">
          <FontAwesomeIcon icon={faCreditCard} className="icon" />
        </div>
        <div className="account-details">
          <h4>{account.title}</h4>
          <span className="account-id">{account.spreadsheetId}</span>
          <div className="account-summary">
            <div className="account-summary-line">
              <div className="label-summary">Balance</div>
              <div className="total-summary">$0.00</div>
            </div>
            <div className="account-summary-line">
              <div className="label-summary">Buckets</div>
              <div className="total-summary">0</div>
            </div>
          </div>
        </div>
        <button
          className="button-more"
          onClick={onShowMenu(account.spreadsheetId)}
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      </AccountContainer>
    </>
  );
};
