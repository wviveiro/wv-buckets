import {
  GetSheetResult,
  SheetSchema,
  SpreadsheetDetailsResult,
} from './sheet-api.interface';
import { getGapi, getGlobalSettings } from '../settings';

export const getSheet = async <T = any>(
  sheet: SheetSchema<T>,
  attempts: number = 0
): Promise<T[] | never> => {
  const gapi = await getGapi();
  const globalSettings = getGlobalSettings();

  try {
    const result = (await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: globalSettings.spid,
      range: `${sheet.name}!A2:D1000`,
    })) as GetSheetResult;

    return (result.result.values || []).map((columns) => {
      return sheet.columns.reduce((acc, column, index) => {
        let value: string | number = columns[index];
        if (column.type === 'number') {
          value = +columns[index].replace('$', '').replace(/,/gi, '');
        }

        return {
          ...acc,
          [column.name as keyof T]: value,
        };
      }, {}) as T;
    });
  } catch (error) {
    if (attempts > 0) return treatError(error);

    // Something wrong happen - try to create sheet first
    await createSheet(sheet);
    return await getSheet(sheet, 1);
  }
};

export const createSheet = async <T>(sheet: SheetSchema<T>) => {
  const gapi = await getGapi();
  const globalSettings = getGlobalSettings();

  try {
    const result = await gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: globalSettings.spid,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheet.name,
              },
            },
          },
        ],
      },
    });

    await addSheetRows(sheet, [sheet.columns.map((column) => column.label)]);

    return result;
  } catch (e) {
    return treatError(e);
  }
};

export const addSheetRows = async <T = any>(
  sheet: SheetSchema<T>,
  rows: string[][]
) => {
  const gapi = await getGapi();
  const globalSettings = getGlobalSettings();

  try {
    const result = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: globalSettings.spid,
      range: `${sheet.name}!A1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: rows,
      },
    });
    return result;
  } catch (e) {
    return treatError(e);
  }
};

/**
 * Get details of a spreadsheet
 */
export const getSpreadsheetDetails = async (
  spreadsheetId: string
): Promise<SpreadsheetDetailsResult> => {
  const gapi = await getGapi();

  return gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
    fields:
      'sheets.properties.title,sheets.properties.sheetId,properties.title',
  });
};

export const getSheetDetails = async <T>(
  spreadsheetId: string,
  sheet: SheetSchema<T>
) => {
  let spreadsheet: SpreadsheetDetailsResult;

  try {
    spreadsheet = await getSpreadsheetDetails(spreadsheetId);
  } catch (e) {
    await createSheet(sheet);
    spreadsheet = await getSpreadsheetDetails(spreadsheetId);
  }

  return spreadsheet.result.sheets.find(
    (_sheet) => _sheet.properties.title === sheet.name
  );
};

// export const deleteRows = async ()

const treatError = (e: any) => {
  if (typeof e === 'string') throw new Error(e);
  if (e instanceof Error) throw e;
  if (e?.result?.error?.message) throw new Error(e.result.error.message);
  console.error('Error not identified', e);
  throw new Error('Error not identified. Check log');
};
