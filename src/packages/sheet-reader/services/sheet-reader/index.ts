import {
  createSheet,
  getSheetRows,
  getSpreadsheetDetails,
} from 'components/sheet-api';
import { Columns } from './types';

export const readSheet = async <
  T extends Record<string, string | number | object | undefined> = any
>(
  spreadsheetId: string,
  sheetName: string,
  columns: Columns
): Promise<T[]> => {
  const spreadsheet = await getSpreadsheetDetails(spreadsheetId);

  const foundSheet = spreadsheet.result.sheets?.find(
    (sheet) => sheet.properties?.title === sheetName
  );

  const columnNames = Object.entries(columns).map(
    ([key, column]) => column.label || key
  );

  if (!foundSheet) await createSheet(spreadsheetId, sheetName, columnNames);

  const rows = await getSheetRows(spreadsheetId, sheetName, {
    columns: columnNames.length,
  });

  const mappedObject = rows.map((row) => {
    return Object.entries(columns).reduce((acc, [key, entry], index) => {
      const value: string = row[index];
      let newValue: string | number | object | undefined = value;

      if (value !== undefined) {
        if (entry.type === 'number') newValue = +value;
        if (entry.type === 'object') newValue = JSON.parse(value);
      }

      acc[key] = newValue;

      return acc;
    }, {} as Record<string, string | number | object | undefined>);
  });

  return mappedObject as T[];
};
