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

  const chartObj: Record<string, { name: string; total: number }> = {};
  const keyFormats = {
    week: { format: 'yyyy-II', display: 'II yyyy' },
    month: { format: 'yyyy-MM', display: 'LLL yyyy' },
    day: { format: 'yyyy-MM-dd', display: 'dd LLL yyyy' },
  };

  rowDates.dates.forEach((day) => {
    const obj = rowDates.dateObj[day];
    const key = format(new Date(day), keyFormats[chartDisplay].format);

    if (!chartObj[key])
      chartObj[key] = {
        name: format(new Date(day), keyFormats[chartDisplay].display),
        total: 0,
      };

    chartObj[key].total += Math.floor(obj.total * 100);

    return {
      name: obj.formatDate,
      total: obj.total,
    };
  });

  const chartData = Object.entries(chartObj).map(([, entry]) => ({
    name: entry.name,
    total: Math.round(entry.total / 100),
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
