import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { rowController } from 'components/ui-components/row-modal/row-modal.hook';
import React from 'react';
import { useParams } from 'react-router';

export const useBucketsState = () => {
  const { accountid } = useParams<{ accountid: string }>();

  const { account, buckets } = useAccountDetails(accountid, true);

  const addValue =
    (category: string) => (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.preventDefault();

      rowController.open({
        account_id: accountid,
        category,
        type: 'expense',
      });
    };

  return {
    account,
    buckets,
    addValue,
  };
};
