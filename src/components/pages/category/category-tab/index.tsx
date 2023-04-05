import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { TabButton, TabContainer } from './styled';

const mainRoute = '/accounts/:accountid/category/:category';
export const CategoryTab: React.FC = () => {
  const isList = useRouteMatch({ path: `${mainRoute}/list` });
  const isChart = useRouteMatch({ path: `${mainRoute}/chart` });
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
