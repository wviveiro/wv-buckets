import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { useParams } from 'react-router';

export const useBucketsState = () => {
  const { accountid } = useParams<{ accountid: string }>();

  const { account, buckets } = useAccountDetails(accountid, true);

  return {
    account,
    buckets,
  };
};
