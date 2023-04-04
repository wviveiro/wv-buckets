import { getAccountRows } from 'components/redux/selectors/accounts/accounts.helpers';

export interface RowDates {
  dates: string[];
  dateObj: {
    [date: string]: {
      date: string;
      formatDate: string;
      total: number;
      rows: ReturnType<typeof getAccountRows>;
    };
  };
}
