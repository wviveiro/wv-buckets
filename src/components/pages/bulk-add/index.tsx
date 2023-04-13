import { PageBody, PageContainer } from 'components/ui-components/layout/page';
import { PageHeader } from 'components/ui-components/layout/page-header';
import { BucketFooter } from 'packages/bucket-commons/bucket-footer';
import React from 'react';

export const BulkAdd: React.FC = () => {
    return (
        <PageContainer>
            <PageHeader title="Bulk actions" linkBack="/" />
            <PageBody />
            <BucketFooter />
        </PageContainer>
    );
};
