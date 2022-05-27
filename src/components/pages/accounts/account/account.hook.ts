import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AccountProps } from './account.interface';

export const useAccountState = (props: AccountProps) => {
  const { account, onShowMenu } = props;
  const history = useHistory();

  const { balance, buckets, initialiseAccount } = useAccountDetails(
    account.spreadsheetId
  );

  const openBuckets = () => {
    history.push(`/accounts/${account.spreadsheetId}/buckets`);
  };

  useEffect(() => {
    initialiseAccount();
  }, [initialiseAccount]);

  return { account, balance, buckets, onShowMenu, openBuckets };
};
