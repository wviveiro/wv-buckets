import { PageBody, PageContainer } from 'components/ui-components/layout/page';
import { PageHeader } from 'components/ui-components/layout/page-header';
import React, { useContext } from 'react';
import { useCategoryList } from '../category-list/category-list.hook';
import { CategoryTab } from '../category-tab';

import {
  CartesianGrid,
  XAxis,
  ComposedChart,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from 'recharts';
import { formatToCurrency } from 'components/util/format-to-currency';
import { ThemeContext } from 'styled-components';
import { ChartTypeButton, ChartTypeContainer } from './styled';

export const CategoryChart: React.FC = () => {
  const {
    accountid,
    category,
    chartData,
    chartDisplay,
    chartTypes,
    handleChangeChartType,
  } = useCategoryList();
  const themeContext = useContext(ThemeContext);

  return (
    <PageContainer>
      <PageHeader
        title={category}
        linkBack={`/accounts/${accountid}/buckets`}
      />
      <CategoryTab />
      <PageBody>
        <ChartTypeContainer>
          {chartTypes.map((type) => (
            <ChartTypeButton
              onClick={handleChangeChartType(type)}
              data-active={chartDisplay === type}
              key={type}
            >
              {type.charAt(0).toUpperCase()}
              {type.substring(1)}
            </ChartTypeButton>
          ))}
        </ChartTypeContainer>

        <ResponsiveContainer width={'100%'} height={400}>
          <ComposedChart data={chartData}>
            <Bar dataKey="total" fill={themeContext.colors.success} />
            <CartesianGrid strokeDasharray="3 5" />
            <XAxis dataKey="name" />
            <Tooltip
              labelStyle={{ color: '#000' }}
              formatter={(value) => formatToCurrency(value as number)}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </PageBody>
    </PageContainer>
  );
};
