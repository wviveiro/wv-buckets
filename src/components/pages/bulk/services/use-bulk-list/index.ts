import { useRouteParams } from 'components/router/controllers/use-route-params';
import { useSettings } from 'components/util/use-settings';
import { BulkSetting } from './types';

export const useBulkList = () => {
    const { spreadsheetId } = useRouteParams();

    const [{ isLoaded, hasError }, { getSetting }] = useSettings(spreadsheetId);

    const { list } = getSetting<BulkSetting>('bulk-list', { list: [] });

    return { list, isLoaded, hasError, spreadsheetId };
};
