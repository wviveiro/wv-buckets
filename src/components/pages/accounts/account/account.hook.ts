import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import { useHistory } from 'react-router-dom';
import { AccountProps } from './account.interface';

export const useAccountState = (props: AccountProps) => {
  const { account, onShowMenu } = props;
  const history = useHistory();

  const { balance, buckets } = useAccountDetails(account.spreadsheetId, true);

  const openBuckets = () => {
    history.push(`/accounts/${account.spreadsheetId}/buckets`);
  };

  return { account, balance, buckets, onShowMenu, openBuckets };
};
