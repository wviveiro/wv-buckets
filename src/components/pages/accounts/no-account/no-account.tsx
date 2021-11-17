import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NoAccountContainer } from './no-account.styled';

export const NoAccount: React.FC = () => {
  return (
    <NoAccountContainer>
      <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
      <p>
        You don't have any account. Start setting up one by clicking the button
        below
      </p>
    </NoAccountContainer>
  );
};
