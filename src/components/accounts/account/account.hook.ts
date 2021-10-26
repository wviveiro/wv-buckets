import {
  loadAccounts,
  startLoadingAccount,
} from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AccountProps } from './account.interface';

export const AccountState = (props: AccountProps) => {
  const { account } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const main = async () => {
      dispatch(startLoadingAccount(account.spreadsheetId));
      const details = await initialiseDatabase([account.spreadsheetId]);
      dispatch(loadAccounts(details));
    };

    main();

    return () => {
      mounted = false;
    };
  }, [account.spreadsheetId, dispatch]);

  return { account };
};
