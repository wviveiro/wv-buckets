import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SplashScreen } from 'components/splash-screen';
import { Button } from 'components/ui-components/button';
import { LayoutFooter } from 'components/ui-components/footer';
import { PageHeader } from 'components/ui-components/layout/page-header';
import { formatToCurrency } from 'components/util/format-to-currency';
import React from 'react';
import { useBucketsState } from './buckets.hook';
import {
  AddButton,
  BucketContentContainer,
  BucketErrorContainer,
  BucketItem,
  BucketsContainer,
} from './buckets.styled';

export const Buckets: React.FC = () => {
  const { account, buckets, addValue } = useBucketsState();

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
                    <AddButton onClick={addValue(bucketId)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </AddButton>
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
      <LayoutFooter>
        <Button onClick={addValue('')}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </LayoutFooter>
    </BucketsContainer>
  );
};
