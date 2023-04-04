import React from 'react';
import { PageHeader } from 'components/ui-components/layout/page-header';
import { useCategoryList } from './category-list.hook';
import {
  CategoryListContainer,
  CurrencyTotal,
  LineAmount,
} from './category-list.styled';
import { formatToCurrency } from 'components/util/format-to-currency';
import { PageBody, PageContainer } from 'components/ui-components/layout/page';
import { CategoryTab } from '../category-tab';

export const CategoryList: React.FC = () => {
  const { accountid, category, available, rowDates } = useCategoryList();

  return (
    <PageContainer>
      <PageHeader
        title={category}
        linkBack={`/accounts/${accountid}/buckets`}
      />
      <CategoryTab />
      <PageBody>
        <CategoryListContainer>
          <div className="category-available">
            <h3>Available</h3>
            <CurrencyTotal amount={available}>
              {formatToCurrency(available)}
            </CurrencyTotal>
          </div>
          {rowDates.dates.map((date) => {
            const dateObj = rowDates.dateObj[date];
            return (
              <div className="date-row" key={date}>
                <div className="date-row-header">
                  <strong>{dateObj.formatDate}</strong>
                  <CurrencyTotal amount={dateObj.total}>
                    {formatToCurrency(dateObj.total)}
                  </CurrencyTotal>
                </div>
                {dateObj.rows.map((row, index) => (
                  <div className="date-row-item" key={index}>
                    <span>{row.message || 'No message'}</span>
                    <LineAmount amount={row.amount}>
                      {formatToCurrency(row.amount)}
                    </LineAmount>
                  </div>
                ))}
              </div>
            );
          })}
        </CategoryListContainer>
      </PageBody>
    </PageContainer>
  );
};
