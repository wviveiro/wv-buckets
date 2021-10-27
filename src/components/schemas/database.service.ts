import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';
import {
  createSheet,
  getSheetRows,
  getSpreadsheetDetails,
  treatGoogleAPIError,
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

      const schemas: DatabaseInterface = {};

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

        schemas[Schema.name].rows = rows.map((row) => {
          const values = Object.keys(Schema.schema).map((key, index) => [
            key,
            row[index],
          ]);

          return values.reduce((acc, curr) => {
            return {
              ...acc,
              [curr[0]]: curr[1],
            };
          }, {}) as SchemaTypes;
        });
      }

      accounts.push({
        title: details.result.properties?.title || 'Untitled',
        spreadsheetId,
        schemas: schemas,
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
