import { useEffect } from 'react';
import { useStateStatus } from '../../util/use-state-status';
import { wvbucket } from '../buckets/buckets.interface';
import { getSheet } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { AccountListState } from './account-list.interface';

export const useAccountListState = () => {
  const [state, setState] = useStateStatus<AccountListState>({
    rows: [],
  });

  useEffect(() => {
    getSheet(wvbucket)
      .then((rows) => {
        setState({
          status: Status.loaded,
          rows,
        });
      })
      .catch((reason) => {
        alert(reason.message);
      });
  }, [setState]);

  return {
    state,
  };
};
