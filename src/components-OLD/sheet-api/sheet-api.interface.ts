export interface GetSheetResult {
  body: string;
  headers: {
    [key: string]: string;
  };
  result: {
    majorDimension: string;
    range: string;
    values: string[][];
  };
}

export interface SheetSchema<T> {
  name: string;
  columns: {
    label: string;
    name: keyof T;
    /** Treat value as what it is */
    type?: 'string' | 'number';
  }[];
}

export interface SpreadsheetDetailsResult {
  body: string;
  headers: {
    [key: string]: string;
  };
  result: {
    properties: {
      title: string;
    };
    sheets: {
      properties: {
        title: string;
        sheetId: number;
      };
    }[];
  };
}
