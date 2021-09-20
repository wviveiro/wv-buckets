import { OptionType } from '../../util/option.interface';
import { Status } from '../statuses/statuses.interface';

export interface AddRowStateInterface {
  status: Status;
  categories: OptionType[];
  category: OptionType | null;
  amount: number;
  date: string;
  message: string;
}
