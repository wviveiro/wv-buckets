import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useBucketsState } from './buckets.hook';
import {
  BucketErrorContainer,
  BucketsContainer,
  BucketsHeader,
} from './buckets.styled';

export const Buckets: React.FC = () => {
  const { account } = useBucketsState();

  if (!account) return null;

  return (
    <BucketsContainer>
      <BucketsHeader>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Account his is this fdjd, fld jr </h2>
      </BucketsHeader>
      {account.error && (
        <BucketErrorContainer>{account.error}</BucketErrorContainer>
      )}
    </BucketsContainer>
  );
};
