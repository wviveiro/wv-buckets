import { EntityId } from '@reduxjs/toolkit';
import {
  loadAccounts,
  startLoadingAccount,
} from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts } from '.';
import { getAccountDetails } from './accounts.helpers';

export const useAccountDetails = (
  spreadsheetId: EntityId,
  initialise = false
) => {
  const accounts = useSelector(selectAccounts);
  const dispatch = useDispatch();

  const result = useMemo(() => {
    return getAccountDetails(accounts, spreadsheetId);
  }, [accounts, spreadsheetId]);

  const { account: { initialised = false } = {} } = result;

  useEffect(() => {
    if (!initialise) return;
    if (initialised) return;

    const init = async () => {
      dispatch(startLoadingAccount(spreadsheetId));
      const details = await initialiseDatabase([spreadsheetId as string]);
      dispatch(loadAccounts(details));
    };

    init();
  }, [spreadsheetId, initialise, initialised, dispatch]);

  return result;
};
