import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SplashScreen } from 'components/splash-screen';
import React from 'react';
import { Link } from 'react-router-dom';
import { useBucketsState } from './buckets.hook';
import {
  BucketContentContainer,
  BucketErrorContainer,
  BucketItem,
  BucketsContainer,
  BucketsHeader,
} from './buckets.styled';

export const Buckets: React.FC = () => {
  const { account, buckets } = useBucketsState();

  if (!account) return null;

  return (
    <BucketsContainer>
      <BucketsHeader>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Account his is this fdjd, fld jr </h2>
      </BucketsHeader>
      {account.loading ? (
        <BucketContentContainer>
          <SplashScreen hasSpinner={true} />
        </BucketContentContainer>
      ) : account.error ? (
        <BucketErrorContainer>{account.error}</BucketErrorContainer>
      ) : (
        <BucketContentContainer>
          <div className="flex">
            {buckets.ids.map((bucketId) => (
              <BucketItem
                key={bucketId}
                total={buckets.buckets[bucketId].total}
              >
                <div className="bucket-inner">
                  <div className="bucket-name">
                    <h3>{bucketId}</h3>
                  </div>
                  <div className="bucket-price">
                    <strong>
                      $ {buckets.buckets[bucketId].total.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </BucketItem>
            ))}
          </div>
        </BucketContentContainer>
      )}
    </BucketsContainer>
  );
};
