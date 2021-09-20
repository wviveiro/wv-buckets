import React, { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { getSheet } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { BucketsStateInterface, wvbucket } from './buckets.interface';
import { transformRowsIntoBuckets } from './buckets.service';

export const useBucketsState = () => {
  const [state, setState] = useCreateState<BucketsStateInterface>({
    status: Status.initializing,
    rows: { ids: [], entities: {} },
    search: '',
  });

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState({ search: ev.target.value });
  };

  const isBucketFiltered = (id: string) => {
    if (!state.search.trim()) return true;
    return id.trim().toLowerCase().includes(state.search.trim().toLowerCase());
  };

  useEffect(() => {
    getSheet(wvbucket)
      .then((rows) => {
        setState({
          status: Status.loaded,
          rows: transformRowsIntoBuckets(rows),
        });
      })
      .catch((reason) => {
        alert(reason.message);
      });
  }, [setState]);

  return {
    state,
    handleSearch,
    isBucketFiltered,
  };
};
