export type SchemaBuilder<Columns> = {
  [key in keyof Columns]: {
    label: string;
    type?: 'string' | 'number';
  };
};
