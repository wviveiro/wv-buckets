import { setAlert } from 'components/alert';
import { treatGoogleAPIError } from 'components/google/google-api/google-api';
import { readSheet } from 'packages/sheet-reader';
import { useCallback, useEffect, useState } from 'react';
import { Status } from '../status';
import type { SettingRow } from './types';

export const useSettings = (spreadsheetId: string) => {
    const [settingRows, setSettingRows] = useState<SettingRow[]>([]);
    const [status, setStatus] = useState<Status>(Status.loading);

    useEffect(() => {
        const load = async () => {
            try {
                const settings = await readSheet<SettingRow>(
                    spreadsheetId,
                    'WVBUCKETSETTINGS',
                    {
                        settingName: {
                            type: 'string',
                        },
                        data: {
                            type: 'object',
                        },
                    }
                );

                setSettingRows(settings);
                setStatus(Status.loaded);
            } catch (err) {
                setAlert(treatGoogleAPIError(err), 'danger');
                setStatus(Status.error);
            }
        };

        load();
    }, []);

    const getSetting = useCallback(
        <T>(findSettingName: string) => {
            const setting = settingRows.find(
                ({ settingName }) => findSettingName === settingName
            );

            if (setting) return setting.data as T;

            return undefined;
        },
        [settingRows]
    );

    const updateSettings = useCallback(
        (findSettingName: string, data: unknown) => {
            const index = settingRows.findIndex(
                ({ settingName }) => findSettingName === settingName
            );

            const cell = index > -1 ? `A${index + 2}` : `A1:append`;
        },
        []
    );

    return [{ settingRows, status }, { getSetting }] as const;
};
