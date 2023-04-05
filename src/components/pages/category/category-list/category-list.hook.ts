import { setAlert } from 'components/alert';
import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RowDates } from './category-list.types';

export const useCategoryList = () => {
  const { accountid, category } = useParams<{
    accountid: string;
    category: string;
  }>();
  const { account, buckets } = useAccountDetails(accountid, true);
  const chartTypes = ['month', 'week', 'day'] as const;
  type ChartType = typeof chartTypes[number];
  const [chartDisplay, setChartDisplay] = useState<ChartType>('month');
  const history = useHistory();

  const { initialised = false } = account || {};

  const bucket = buckets.buckets[category] || undefined;

  const rows = bucket?.rows;

  const rowDates = useMemo(
    () =>
      rows?.reduce(
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
                  formatDate: format(new Date(date), 'ccc dd LLL yyyy'),
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
      },
    [rows]
  );

  const chartObj: Record<
    string,
    { name: string; debit: number; credit: number; balance: number }
  > = {};
  const keyFormats = {
    week: { format: 'yyyy-II', display: 'II yyyy' },
    month: { format: 'yyyy-MM', display: 'LLL yyyy' },
    day: { format: 'yyyy-MM-dd', display: 'dd LLL yyyy' },
  };
  let balance: number = 0;

  rowDates.dates
    .slice(0)
    .reverse()
    .forEach((day) => {
      const obj = rowDates.dateObj[day];
      const key = format(new Date(day), keyFormats[chartDisplay].format);
      const total = Math.floor(obj.total * 100);
      balance += total;

      if (!chartObj[key])
        chartObj[key] = {
          name: format(new Date(day), keyFormats[chartDisplay].display),
          credit: 0,
          debit: 0,
          balance: 0,
        };

      if (total > 0) {
        chartObj[key].credit += total;
      }
      if (total < 0) {
        chartObj[key].debit += total;
      }
      chartObj[key].balance = balance;
    });

  const chartData = Object.entries(chartObj).map(([, entry]) => ({
    name: entry.name,
    credit: Math.round(entry.credit / 100),
    debit: Math.round(entry.debit / 100),
    balance: Math.round(entry.balance / 100),
  }));

  const handleChangeChartType = (type: ChartType) => () =>
    setChartDisplay(type);

  const available = bucket?.total || 0;

  const hasBucket = !!bucket;

  useEffect(() => {
    if (!hasBucket && initialised) {
      setAlert('Bucket not found', 'danger');
      history.push(`/accounts`);
    }
  }, [hasBucket, initialised, history]);

  return {
    account,
    accountid,
    category,
    rowDates,
    available,
    chartData,
    chartDisplay,
    chartTypes,
    handleChangeChartType,
  };
};
