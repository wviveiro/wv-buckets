import { PageBody, PageContainer } from 'components/ui-components/layout/page';
import { PageHeader } from 'components/ui-components/layout/page-header';
import { BucketFooter } from 'packages/bucket-commons/bucket-footer';
import React from 'react';
import { useBulkList } from './services/use-bulk-list';
import { Redirect } from 'react-router-dom';
import { SplashScreen } from 'components/splash-screen';
import { LargeLink } from 'components/ui-components/button';
import { BulkListContainer } from './styled';

export const BulkList: React.FC = () => {
    const { hasError, isLoaded, spreadsheetId } = useBulkList();

    if (hasError) return <Redirect to={`/accounts/${spreadsheetId}/buckets`} />;

    return (
        <PageContainer>
            <PageHeader title="Bulk actions" linkBack="/" />
            <PageBody>
                {!isLoaded && (
                    <SplashScreen hasSpinner>Loading settings</SplashScreen>
                )}
                {isLoaded && (
                    <BulkListContainer>
                        <LargeLink to={`/accounts/${spreadsheetId}/bulk/add`}>
                            Add bulk list
                        </LargeLink>
                    </BulkListContainer>
                )}
            </PageBody>
            <BucketFooter />
        </PageContainer>
    );
};
