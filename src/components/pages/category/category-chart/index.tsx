import { PageContainer } from 'components/ui-components/layout/page';
import { PageHeader } from 'components/ui-components/layout/page-header';
import React from 'react';
import { useCategoryList } from '../category-list/category-list.hook';
import { CategoryTab } from '../category-tab';

export const CategoryChart: React.FC = () => {
  const { accountid, category } = useCategoryList();

  return (
    <PageContainer>
      <PageHeader
        title={category}
        linkBack={`/accounts/${accountid}/buckets`}
      />
      <CategoryTab />
    </PageContainer>
  );
};
