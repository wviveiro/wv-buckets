import { treatGoogleAPIError } from 'components/google/google-api/google-api';
import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';
import {
  createSheet,
  getSheetRows,
  getSpreadsheetDetails,
} from 'components/sheet-api';
import { SheetProperties } from '.';
import { Schemas } from './database.interface';
import { DatabaseInterface, SchemaTypes } from './database.interface';

export const initialiseDatabase = async (
  spreadsheetIds: string[]
): Promise<AccountInterface[]> => {
  const accounts: AccountInterface[] = [];
  for (const spreadsheetId of spreadsheetIds) {
    try {
      const details = await getSpreadsheetDetails(spreadsheetId);

      // Find sheets inside spreadsheet
      const sheets = (details.result.sheets || []).reduce(
        (acc: { [key: string]: SheetProperties }, curr) => {
          if (!curr.properties) return acc;
          const title = curr.properties?.title || 'Untitled';
          return {
            ...acc,
            [title]: curr.properties,
          };
        },
        {}
      );

      const schemas: Partial<DatabaseInterface> = {};

      // Verify if all sheets are in the account
      for (const Schema of Schemas) {
        if (!sheets[Schema.name]) {
          // Create schema in the spreadsheet
          const result = await createSheet(
            spreadsheetId,
            Schema.name,
            Object.entries(Schema.schema).map(([_, entry]) => entry.label)
          );

          schemas[Schema.name] = {
            id: result.sheetId || 0,
            rows: [],
          };
        } else {
          schemas[Schema.name] = {
            id: sheets[Schema.name].sheetId || 0,
            rows: [],
          };
        }

        const rows = await getSheetRows(spreadsheetId, Schema.name, {
          columns: Object.entries(Schema.schema).length,
        });

        (schemas as DatabaseInterface)[Schema.name].rows = rows.map(
          (row, index) => {
            const values: [string, string, string | undefined][] =
              Object.entries(Schema.schema).map(([key, entry], index) => [
                key,
                row[index],
                entry.type,
              ]);

            return values.reduce((acc, curr) => {
              if (!curr[0]) return acc;
              let v: string | number = curr[1];

              if (curr[2] === 'number' && v !== undefined) {
                const num = +v.replace(/[$,]/g, '');
                if (!isNaN(num)) v = num;
              }

              return {
                ...acc,
                [curr[0]]: v,
              };
            }, {}) as SchemaTypes;
          }
        );
      }

      accounts.push({
        title: details.result.properties?.title || 'Untitled',
        spreadsheetId,
        schemas: schemas as DatabaseInterface,
        initialised: true,
        loading: false,
        error: false,
      });
    } catch (error: any) {
      accounts.push({
        title: 'Untitled',
        spreadsheetId,
        schemas: undefined,
        error: treatGoogleAPIError(error),
        initialised: true,
        loading: false,
      });
    }
  }

  return accounts;
};
