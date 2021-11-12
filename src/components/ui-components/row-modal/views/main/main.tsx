import {
  faChevronRight,
  faCreditCard,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Toggler } from 'components/ui-components/toggler';
import React from 'react';
import { useRowModalContext } from '../../context/row-modal-context';
import BlackModal from 'components/ui-components/black-modal';
import { format, parseISO } from 'date-fns';
import { AccountBalance } from 'components/accounts/account/account.styled';

export const RowMainView: React.FC = () => {
  const {
    state,
    typeOptions,
    integer,
    decimal,
    selectedAccount,
    multipleAccounts,
    accountBalance,
    onSelectType,
    onSetDescription,
    onKeyPressAmount,
    onSelectAccount,
    setState,
  } = useRowModalContext();

  const onClose = () => {
    setState({ open: false });
  };

  const onClickCategory = () => {
    setState({ openCategoryList: true });
  };

  const onOpenDatePicker = () => {
    setState({ openDatePicker: true });
  };

  return (
    <>
      <BlackModal.Title
        rightButton={
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        }
      >
        Transaction
      </BlackModal.Title>
      <BlackModal.List>
        <div className="row-modal-selected-account">
          <div className="account-details">
            <h5>{selectedAccount?.title || state.account_id}</h5>
            <span>
              <FontAwesomeIcon icon={faCreditCard} className="icon" />
            </span>
            <span>Balance&nbsp;&nbsp;</span>
            <AccountBalance negative={accountBalance < 0}>
              ${accountBalance.toLocaleString()}
            </AccountBalance>
          </div>
          {multipleAccounts && (
            <div className="account-more">
              <button className="btn-select-account" onClick={onSelectAccount}>
                <FontAwesomeIcon icon={faChevronRight} className="icon" />
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="flex account-row-details">
          <div className="account-block half-block right-border">
            <strong>Category</strong>
            <button onClick={onClickCategory}>
              <span>{state.category || 'UNKNOWN'}</span>
            </button>
          </div>
          <div className="account-block half-block">
            <strong>Date</strong>
            <button onClick={onOpenDatePicker}>
              <span>{format(parseISO(state.date), 'dd/MM/yyyy')}</span>
            </button>
          </div>
        </div>
        <hr />
        <div className="account-row-details">
          <div className="account-block">
            <strong>
              Description <small>(optional)</small>
            </strong>
            <input
              className="input-description"
              value={state.message}
              onChange={onSetDescription}
            />
          </div>
        </div>

        <Toggler
          value={state.type}
          options={typeOptions}
          onChange={onSelectType}
        />

        <div className={classNames('account-amount', state.type)}>
          <span className="dollar-sign">
            {state.type === 'expense' ? '-$' : '$'}
          </span>
          <span className="integer-part">{integer}</span>
          <span className="decimal-part">.{decimal}</span>

          <input
            className="input-amount"
            type="number"
            onKeyDown={onKeyPressAmount}
            inputMode="decimal"
          />
          <hr />
        </div>

        <button className="add-row-button">Save Transaction</button>
      </BlackModal.List>
    </>
  );
};
