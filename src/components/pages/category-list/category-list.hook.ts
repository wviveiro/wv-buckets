import { setAlert } from 'components/alert';
import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RowDates } from './category-list.types';

export const useCategoryList = () => {
  const { accountid, category } = useParams<{
    accountid: string;
    category: string;
  }>();
  const { account, buckets } = useAccountDetails(accountid, true);
  const history = useHistory();

  const { initialised = false } = account || {};

  const bucket = buckets.buckets[category] || undefined;

  const rowDates = bucket?.rows?.reduce(
    (acc, curr) => {
      const date = curr.date;

      const dateExists = acc.dates.find((dt) => dt === date);

      if (!dateExists) {
        return {
          dates: [...acc.dates, date].sort().reverse(),
          dateObj: {
            ...acc.dateObj,
            [date]: {
              date,
              formatDate: format(new Date(date), 'ccc dd LLL'),
              total: curr.amount,
              rows: [curr],
            },
          },
        };
      }

      return {
        ...acc,
        dateObj: {
          ...acc.dateObj,
          [date]: {
            ...acc.dateObj[date],
            total: acc.dateObj[date].total + curr.amount,
            rows: [...acc.dateObj[date].rows, curr],
          },
        },
      };
    },
    {
      dates: [],
      dateObj: {},
    } as RowDates
  ) || {
    dates: [],
    dateObj: {},
  };

  const available = bucket?.total || 0;

  const hasBucket = !!bucket;

  useEffect(() => {
    if (!hasBucket && initialised) {
      setAlert('Bucket not found', 'danger');
      history.push(`/accounts`);
    }
  }, [hasBucket, initialised, history]);

  return { account, accountid, category, rowDates, available };
};
