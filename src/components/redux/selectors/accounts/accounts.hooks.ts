import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts } from '.';

export const useAccountDetails = (spreadsheetId: string) => {
  const accounts = useSelector(selectAccounts);

  const account = useMemo(() => {
    return accounts.entities[spreadsheetId] || false;
  }, [accounts, spreadsheetId]);

  const rows = useMemo(() => {
    if (!account) return [];

    return (
      account.schemas?.WVBUCKET.rows.map((row, id) => ({
        id,
        ...row,
      })) || []
    );
  }, [account]);

  const balance = useMemo(() => {
    return (
      rows.reduce((acc, curr) => {
        return acc + curr.amount * 100;
      }, 0) / 100
    );
  }, [rows]);

  const buckets = useMemo(() => {
    return rows.reduce(
      (
        acc: { ids: string[]; buckets: { [key: string]: typeof rows } },
        curr
      ) => {
        if (!acc.ids.includes(curr.category)) {
          return {
            ids: [...acc.ids, curr.category],
            buckets: {
              ...acc.buckets,
              [curr.category]: [curr],
            },
          };
        }

        return {
          ...acc,
          buckets: {
            ...acc.buckets,
            [curr.category]: [...acc.buckets[curr.category], curr],
          },
        };
      },
      {
        ids: [],
        buckets: {},
      }
    );
  }, [rows]);

  return {
    account,
    rows,
    buckets,
    balance,
  };
};
