import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlackModal from 'components/ui-components/black-modal';
import React from 'react';
import { useRowModalContext } from '../../context/row-modal-context';

export const SelectAccount: React.FC = () => {
  const { setState, accounts } = useRowModalContext();

  const onClose = () => {
    setState({ openAccountList: false });
  };

  return (
    <>
      <BlackModal.Title
        leftButton={
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        }
      >
        Select an Account
      </BlackModal.Title>
    </>
  );
};
