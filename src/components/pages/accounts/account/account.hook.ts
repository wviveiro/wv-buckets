import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import {
  loadAccounts,
  startLoadingAccount,
} from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountProps } from './account.interface';

export const AccountState = (props: AccountProps) => {
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
