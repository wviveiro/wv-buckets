import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Toggler } from '../toggler';
import { useRowModal } from './row-modal.hook';
import { RowModalContainer } from './row-modal.styled';

export const RowModal: React.FC = () => {
  const { state, typeOptions, onSelectType } = useRowModal();

  return (
    <RowModalContainer>
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
            <button className="btn-select-account">
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
            <input className="input-description" />
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
          <span className="integer-part">39</span>
          <span className="decimal-part">.00</span>
          <input className="input-amount" type="number" />
        </div>
      </div>
    </RowModalContainer>
  );
};
