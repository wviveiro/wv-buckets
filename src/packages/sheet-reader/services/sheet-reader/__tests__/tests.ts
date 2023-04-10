import { readSheet } from '../index';
import {
  createSheet,
  getSheetRows,
  getSpreadsheetDetails,
} from 'components/sheet-api';

jest.mock('components/sheet-api', () => ({
  ...jest.requireActual('components/sheet-api'),
  getSpreadsheetDetails: jest.fn(),
  createSheet: jest.fn(),
  getSheetRows: jest.fn(),
}));

const mockGetSpreadsheetDetails = getSpreadsheetDetails as jest.Mock;
const mockGetSheetRows = getSheetRows as jest.Mock;
const mockCreateSheet = createSheet as jest.Mock;

const spreadsheetId = '123322333';

describe('readSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create sheet', async () => {
    mockGetSpreadsheetDetails.mockReturnValue({ result: { sheets: [] } });
    mockGetSheetRows.mockReturnValue([]);

    await readSheet(spreadsheetId, 'Testing', {
      name: { type: 'string' },
      id: { label: 'Id', type: 'number' },
      data: { label: 'Data', type: 'object' },
    });

    expect(mockCreateSheet).toBeCalledWith(spreadsheetId, 'Testing', [
      'name',
      'Id',
      'Data',
    ]);
  });

  it('should not create sheet', async () => {
    mockGetSpreadsheetDetails.mockReturnValue({
      result: { sheets: [{ properties: { title: 'Testing' } }] },
    });
    mockGetSheetRows.mockReturnValue([]);

    await readSheet(spreadsheetId, 'Testing', {
      name: { type: 'string' },
      id: { label: 'Id', type: 'number' },
      data: { label: 'Data', type: 'object' },
    });

    expect(mockCreateSheet).not.toBeCalled();
  });

  it('should return rows', async () => {
    mockGetSpreadsheetDetails.mockReturnValue({
      result: { sheets: [{ properties: { title: 'Testing' } }] },
    });
    mockGetSheetRows.mockReturnValue([
      ['Hello', 1, '{}'],
      ['Another One', 2, '{"a": "foo"}'],
    ]);

    const result = await readSheet(spreadsheetId, 'Testing', {
      name: { type: 'string' },
      id: { label: 'Id', type: 'number' },
      data: { label: 'Data', type: 'object' },
    });

    expect(result).toEqual([
      { name: 'Hello', id: 1, data: {} },
      { name: 'Another One', id: 2, data: { a: 'foo' } },
    ]);
  });
});
