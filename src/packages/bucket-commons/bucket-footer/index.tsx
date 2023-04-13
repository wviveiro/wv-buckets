import React from 'react';
import { LayoutFooter } from 'components/ui-components/footer';
import { Button, LinkButton } from 'components/ui-components/button';
import { useBucketsState } from 'components/pages/buckets/buckets.hook';
import { FaPlus } from 'react-icons/fa';
import { RiPlayListAddFill } from 'react-icons/ri';
import { BsBucketFill } from 'react-icons/bs';
import { useParams, useRouteMatch } from 'react-router-dom';
import { accountRoute } from 'components/router/constants';

export const BucketFooter: React.FC = () => {
    const isBuckets = useRouteMatch({ path: `${accountRoute}/buckets` });
    const isBulk = useRouteMatch({ path: `${accountRoute}/bulk` });
    const { addValue } = useBucketsState();
    const { accountid } = useParams<{ accountid: string }>();

    return (
        <LayoutFooter>
            <LinkButton
                to={`/accounts/${accountid}/buckets`}
                $isActive={!!isBuckets}
            >
                <BsBucketFill />
            </LinkButton>
            <Button onClick={addValue('')}>
                <FaPlus />
            </Button>
            <LinkButton to={`/accounts/${accountid}/bulk`} $isActive={!!isBulk}>
                <RiPlayListAddFill />
            </LinkButton>
        </LayoutFooter>
    );
};
