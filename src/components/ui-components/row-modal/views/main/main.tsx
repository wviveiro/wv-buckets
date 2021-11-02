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

export const RowMainView: React.FC = () => {
  const {
    state,
    typeOptions,
    integer,
    decimal,
    onSelectType,
    onSetDescription,
    onKeyPressAmount,
    setState,
  } = useRowModalContext();

  const onSelectAccount = () => {
    setState({ view: 'select-account' });
  };

  return (
    <div className="row-modal-inner">
      <div className="row-modal-title-container">
        <h4>Transaction</h4>
        <button className="button-close-modal">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="row-modal-selected-account">
        <div className="account-details">
          <h5>Account Name</h5>
          <span>
            <FontAwesomeIcon icon={faCreditCard} className="icon" /> Selected
            Account
          </span>
        </div>
        <div className="account-more">
          <button className="btn-select-account" onClick={onSelectAccount}>
            <FontAwesomeIcon icon={faChevronRight} className="icon" />
          </button>
        </div>
      </div>
      <hr />
      <div className="flex account-row-details">
        <div className="account-block half-block right-border">
          <strong>Category</strong>
          <span>Miscelanious</span>
        </div>
        <div className="account-block half-block">
          <strong>Date</strong>
          <span>10/10/2010</span>
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
        />
        <hr />
      </div>

      <button className="add-row-button">Save Transaction</button>
    </div>
  );
};
