import React from 'react';
import { Grid } from '../../ui-components/grid/grid';
import { useBucketsState } from './buckets.hook';
import { BucketItem } from './buckets.styles';

export const Buckets: React.FC = () => {
  const { state, handleSearch, isBucketFiltered } = useBucketsState();

  return (
    <div>
      <h2>Buckets</h2>
      <hr />
      <input
        onChange={handleSearch}
        value={state.search}
        placeholder="Search Bucket"
      />
      <hr />
      <Grid flexWrap="wrap">
        {state.rows.ids.map((id) => {
          if (!isBucketFiltered(id)) return null;

          const entity = state.rows.entities[id];
          return (
            <BucketItem key={id}>
              <h3>{id}</h3>
              <strong
                className={entity.amount < 0 ? 'text-danger' : 'text-success'}
              >
                ${entity.amount.toFixed(2)}
              </strong>
            </BucketItem>
          );
        })}
      </Grid>
    </div>
  );
};
