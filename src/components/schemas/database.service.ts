import { AccountInterface } from 'components/app/app.interface';
import { getSpreadsheetDetails } from 'components/sheet-api';

export const initialiseDatabase = async (
  spreadsheetIds: string[]
): Promise<AccountInterface[]> => {
  const accounts = [];
  for (const spreadsheetId of spreadsheetIds) {
    const details = await getSpreadsheetDetails(spreadsheetId);

    console.log('details', details);

    accounts.push(spreadsheetId);
  }

  return [];
};
