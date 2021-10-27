import {
  loadAccounts,
  startLoadingAccount,
} from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountProps } from './account.interface';

export const AccountState = (props: AccountProps) => {
  const { account } = props;
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
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
  }, [account.spreadsheetId, dispatch]);

  const onOpenMenu = () => {
    console.log('here?');
    setShowMenu(true);
  };

  return { account, showMenu, onOpenMenu };
};
