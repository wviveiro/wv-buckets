import { AccountInterface } from 'components/app/app.interface';
import {
  createSheet,
  getSpreadsheetDetails,
  treatGoogleAPIError,
} from 'components/sheet-api';
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
        (acc: { [key: string]: gapi.client.sheets.SheetProperties }, curr) => {
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
      }

      accounts.push({
        title: details.result.properties?.title || 'Untitled',
        spreadsheetId,
        schemas: schemas,
        error: false,
        initialised: true,
        loading: false,
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
