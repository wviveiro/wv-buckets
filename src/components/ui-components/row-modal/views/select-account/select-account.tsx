import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faChevronLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRowModalContext } from '../../context/row-modal-context';
import { SelectAccountContainer } from './select-account.styled';

export const SelectAccount: React.FC = () => {
  const { setState, accounts } = useRowModalContext();

  const onGoBack = () => setState({ view: 'main' });

  return (
    <div className="row-modal-inner">
      <div className="row-modal-title-container">
        <h4>
          <button className="button-arrow-left" onClick={onGoBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          Accounts
        </h4>
      </div>
      <SelectAccountContainer>
        {accounts.ids.map((id, index) => (
          <div className="row-modal-account-item" key={index}>
            <div className="row-modal-account-icon">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="row-modal-account-details">
              <p>{accounts.entities[id]?.title}</p>
              <span>{accounts.entities[id]?.spreadsheetId}</span>
            </div>
            <div className="row-modal-account-selected">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        ))}
      </SelectAccountContainer>
    </div>
  );
};
