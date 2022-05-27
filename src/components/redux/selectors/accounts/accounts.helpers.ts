import { EntityId } from '@reduxjs/toolkit';
import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';
import { RootState } from 'components/redux/store';
import { EnumSchemas } from 'components/schemas';

export const getAccount = (
  accounts: RootState['accounts'],
  spreadsheetId: EntityId
) => {
  return accounts.entities[spreadsheetId] || undefined;
};

export const getAccountRows = (account: AccountInterface | undefined) => {
  if (!account) return [];

  return (
    account.schemas?.[EnumSchemas.WVBUCKET].rows.map((row, id) => ({
      id,
      ...row,
    })) || []
  );
};

export const getAccountBuckets = (rows: ReturnType<typeof getAccountRows>) => {
  return rows.reduce(
    (
      acc: {
        ids: string[];
        buckets: { [key: string]: { rows: typeof rows; total: number } };
      },
      curr
    ) => {
      if (!curr.category) return acc;
      const category = curr.category.trim();

      if (!acc.ids.includes(category)) {
        return {
          ids: [...acc.ids, category].sort(),
          buckets: {
            ...acc.buckets,
            [category]: {
              total: +curr.amount,
              rows: [curr],
            },
          },
        };
      }

      return {
        ...acc,
        buckets: {
          ...acc.buckets,
          [category]: {
            ...acc.buckets[category],
            rows: [...acc.buckets[category].rows, curr],
            total: acc.buckets[category].total + +curr.amount,
          },
        },
      };
    },
    {
      ids: [],
      buckets: {},
    }
  );
};

export const getAccountBalance = (rows: ReturnType<typeof getAccountRows>) => {
  return (
    rows.reduce((acc, curr) => {
      if (curr.amount === undefined) return acc;

      return acc + curr.amount * 100;
    }, 0) / 100
  );
};

export const getAccountDetails = (
  accounts: RootState['accounts'],
  spreadsheetId: EntityId
) => {
  const account = getAccount(accounts, spreadsheetId);
  const rows = getAccountRows(account);
  const balance = getAccountBalance(rows);
  const buckets = getAccountBuckets(rows);

  return {
    account,
    rows,
    balance,
    buckets,
  };
};
