import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { TabButton, TabContainer } from './styled';
import { categoryRoute } from 'components/router/constants';

export const CategoryTab: React.FC = () => {
    const isList = useRouteMatch({ path: `${categoryRoute}/list` });
    const isChart = useRouteMatch({ path: `${categoryRoute}/chart` });
    const { accountid, category } = useParams<{
        accountid: string;
        category: string;
    }>();

    return (
        <TabContainer>
            <TabButton
                to={`/accounts/${accountid}/category/${category}/list`}
                data-active={!!isList}
            >
                List
            </TabButton>
            <TabButton
                to={`/accounts/${accountid}/category/${category}/chart`}
                data-active={!!isChart}
            >
                Chart
            </TabButton>
        </TabContainer>
    );
};
