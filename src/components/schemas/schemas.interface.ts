export interface SchemaInterface<Columns> {
  id: string | number;
  rows: Columns[];
}

export interface SchemaBuilder<Columns> {
  name: string;
  schema: {
    [key in keyof Columns]: {
      label: string;
      type?: 'string' | 'number';
    };
  };
}
