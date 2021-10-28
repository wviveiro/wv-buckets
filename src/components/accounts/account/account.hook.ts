import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import {
  loadAccounts,
  startLoadingAccount,
} from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AccountProps } from './account.interface';

export const AccountState = (props: AccountProps) => {
  const { account, onShowMenu } = props;
  const dispatch = useDispatch();

  const { balance, buckets } = useAccountDetails(account.spreadsheetId);

  useEffect(() => {
    if (account.initialised) return;
    let mounted = true;
    const main = async () => {
      dispatch(startLoadingAccount(account.spreadsheetId));
      const details = await initialiseDatabase([account.spreadsheetId]);

      if (!mounted) return;

      dispatch(loadAccounts(details));
    };

    main();

    return () => {
      mounted = false;
    };
  }, [account.spreadsheetId, account.initialised, dispatch]);

  return { account, balance, buckets, onShowMenu };
};
