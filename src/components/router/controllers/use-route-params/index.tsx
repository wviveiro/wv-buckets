import { useParams } from 'react-router-dom';

export const useRouteParams = () => {
    const { accountid: spreadsheetId } = useParams<{ accountid: string }>();

    return { spreadsheetId };
};
