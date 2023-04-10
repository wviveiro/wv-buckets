export type ColumnTypes = 'string' | 'number' | 'object';

export type ColumnObject = {
  label?: string;
  type: ColumnTypes;
};

export type Columns = Record<string, ColumnObject>;
