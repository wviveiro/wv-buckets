import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export const useBucketsState = () => {
  const { accountid } = useParams<{ accountid: string }>();

  const { account, buckets, initialiseAccount } = useAccountDetails(accountid);

  useEffect(() => {
    initialiseAccount();
  }, [initialiseAccount]);

  return {
    account,
    buckets,
  };
};
