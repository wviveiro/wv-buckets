import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderContainer } from './page-header.styled';
import { PageHeaderProps } from './page-header.types';

export const PageHeader: React.FC<PageHeaderProps> = ({ title, linkBack }) => {
  return (
    <PageHeaderContainer>
      {linkBack && (
        <Link to={linkBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      <h2>{title}</h2>
    </PageHeaderContainer>
  );
};
