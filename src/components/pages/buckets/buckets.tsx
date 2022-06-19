import { SplashScreen } from 'components/splash-screen';
import { PageHeader } from 'components/ui-components/layout/page-header';
import { formatToCurrency } from 'components/util/format-to-currency';
import React from 'react';
import { useBucketsState } from './buckets.hook';
import {
  BucketContentContainer,
  BucketErrorContainer,
  BucketItem,
  BucketsContainer,
} from './buckets.styled';

export const Buckets: React.FC = () => {
  const { account, buckets } = useBucketsState();

  if (!account) return null;

  const { title } = account;

  return (
    <BucketsContainer>
      <PageHeader title={title} linkBack={`/`} />
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
                to={`/accounts/${account.spreadsheetId}/category/${bucketId}/list`}
              >
                <div className="bucket-inner">
                  <div className="bucket-name">
                    <h3>{bucketId}</h3>
                  </div>
                  <div className="bucket-price">
                    <strong>
                      {formatToCurrency(buckets.buckets[bucketId].total)}
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
