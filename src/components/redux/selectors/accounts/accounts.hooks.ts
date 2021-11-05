import { EntityId } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts } from '.';
import { getAccountDetails } from './accounts.helpers';

export const useAccountDetails = (spreadsheetId: EntityId) => {
  const accounts = useSelector(selectAccounts);

  const result = useMemo(() => {
    return getAccountDetails(accounts, spreadsheetId);
  }, [accounts, spreadsheetId]);

  return result;
};
