import React from 'react';
import { NoAccountContainer } from './no-account.styled';

export const NoAccount: React.FC = () => {
  return (
    <NoAccountContainer>
      <i className="fas fa-money-check-alt icon" />

      <p>
        You don't have any account. Start setting up one by clicking the button
        below
      </p>
    </NoAccountContainer>
  );
};
