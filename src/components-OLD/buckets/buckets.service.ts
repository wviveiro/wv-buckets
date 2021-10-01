import { BucketEntity, WvBucketRow } from './buckets.interface';

export const transformRowsIntoBuckets = (rows: WvBucketRow[]) => {
  const entityState: BucketEntity = {
    ids: [],
    entities: {},
  };

  rows.forEach((row) => {
    if (!entityState.ids.includes(row.category)) {
      entityState.ids.push(row.category);
      entityState.entities[row.category] = {
        amount: 0,
      };
    }

    entityState.entities[row.category].amount += row.amount;
  });

  return entityState;
};

export const transformRowsIntoOptions = (rows: WvBucketRow[]) => {
  const buckets = transformRowsIntoBuckets(rows);
  return buckets.ids.map((id) => ({ value: id, label: id }));
};
