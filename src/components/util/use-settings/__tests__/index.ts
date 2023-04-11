import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { setAlert } from 'components/alert';
import { Status } from 'components/util/status';
import { readSheet } from 'packages/sheet-reader';
import { useSettings } from '../index';

const mockedData = [
    { settingName: 'testing1', data: { foo: 'bar' } },
    { settingName: 'testing2', data: { foo: 'reck' } },
    { settingName: 'testing3', data: { foo: 'bar' } },
];

jest.mock('packages/sheet-reader', () => ({
    ...jest.requireActual('packages/sheet-reader'),
    readSheet: jest.fn(),
}));

jest.mock('components/alert', () => ({
    ...jest.requireActual('components/alert'),
    setAlert: jest.fn(),
}));

const mockReadSheet = readSheet as jest.Mock;

describe('useSettings', () => {
    it('should load all settings', async () => {
        mockReadSheet.mockReturnValue(mockedData);
        const { result } = renderHook(useSettings);

        await waitFor(() => {
            const [{ settingRows, status }] = result.current;
            expect(settingRows).toEqual(mockedData);
            expect(status).toEqual(Status.loaded);
        });
    });

    it('should keep loading if promise never returns', async () => {
        mockReadSheet.mockImplementationOnce(() => new Promise(() => {}));
        const { result } = renderHook(useSettings);

        await waitFor(() => {
            const [{ settingRows, status }] = result.current;
            expect(settingRows).toEqual([]);
            expect(status).toEqual(Status.loading);
        });
    });

    it('should show alert in case of error', async () => {
        mockReadSheet.mockImplementationOnce(
            () =>
                new Promise(() => {
                    throw new Error('Something went wrong');
                })
        );

        const { result } = renderHook(useSettings);

        await waitFor(() => {
            const [{ settingRows, status }] = result.current;
            expect(settingRows).toEqual([]);
            expect(status).toEqual(Status.error);
            expect(setAlert).toBeCalledWith('Something went wrong', 'danger');
        });
    });

    it('should should get specific setting', async () => {
        mockReadSheet.mockReturnValue(mockedData);
        const { result } = renderHook(useSettings);

        await waitFor(() => {
            const [{ settingRows }] = result.current;
            expect(settingRows).toEqual(mockedData);
        });

        const [, { getSetting }] = result.current;

        const data = getSetting<{ foo: string }>('testing2');

        expect(data).toEqual({ foo: 'reck' });

        const data2 = getSetting<{ foo: string }>('testingw2');

        expect(data2).toEqual(undefined);
    });
});
