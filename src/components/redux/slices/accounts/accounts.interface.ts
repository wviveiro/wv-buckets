import { DatabaseInterface } from 'components/schemas';

export interface AccountInterface {
  title: string;
  spreadsheetId: string;
  schemas?: DatabaseInterface;
  initialised: boolean;
  loading: boolean;
  error: boolean | string;
}
