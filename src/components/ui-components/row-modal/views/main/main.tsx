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
import { AccountBalance } from 'components/pages/accounts/account/account.styled';
import { Status } from 'components/util/status';

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
    onSave,
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
          <button onClick={onClose} disabled={state.disabled}>
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
              <button
                className="btn-select-account"
                disabled={state.disabled}
                onClick={onSelectAccount}
              >
                <FontAwesomeIcon icon={faChevronRight} className="icon" />
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="flex account-row-details">
          <div className="account-block half-block right-border">
            <strong>Category</strong>
            <button onClick={onClickCategory} disabled={state.disabled}>
              <span>{state.category || 'UNKNOWN'}</span>
            </button>
          </div>
          <div className="account-block half-block">
            <strong>Date</strong>
            <button onClick={onOpenDatePicker} disabled={state.disabled}>
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
              disabled={state.disabled}
            />
          </div>
        </div>

        <Toggler
          value={state.type}
          options={typeOptions}
          onChange={onSelectType}
          disabled={state.disabled}
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
            disabled={state.disabled}
          />
          <hr />
        </div>

        <button
          className="add-row-button"
          onClick={onSave}
          disabled={state.disabled}
        >
          {state.status === Status.loading ? 'Saving...' : 'Save Transaction'}
        </button>
      </BlackModal.List>
    </>
  );
};
