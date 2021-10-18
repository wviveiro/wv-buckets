export interface SchemaInterface<Columns> {
  id: string | number;
  name: string;
  columns: Columns[];
}

export interface SchemaBuilder<Columns> {
  name: string;
  schema: {
    [key in keyof Columns]: {
      label: string;
    };
  };
}
