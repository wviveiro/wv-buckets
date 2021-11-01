import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faBackspace,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRowModal } from './row-modal.hook';
import { RowModalContainer, Switcher } from './row-modal.styled';

export const RowModal: React.FC = () => {
  const { selectedType, typeOptions, onSelectType } = useRowModal();

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

        <Switcher active={selectedType} length={typeOptions.length}>
          {typeOptions.map((option, index) => (
            <div className="switch-item" key={index}>
              <button
                className="switch-button"
                onClick={onSelectType(option.value)}
              >
                {option.label}
              </button>
            </div>
          ))}
        </Switcher>

        <div className="account-amount">
          <span className="dollar-sign">$</span>
          <span className="integer-part">39</span>
          <span className="decimal-part">.00</span>
          <input className="input-amount" type="number" />
        </div>
      </div>
    </RowModalContainer>
  );
};
