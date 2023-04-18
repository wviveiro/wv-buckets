import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { AuthRoute } from './auth-route';
import { Main } from 'components/pages/accounts';
import { Buckets } from 'components/pages/buckets/buckets';
import { CategoryList } from 'components/pages/category/category-list';
import { Authenticate } from 'components/pages/authenticate';
import { CategoryChart } from 'components/pages/category/category-chart';
import { accountRoute, categoryRoute } from './constants';
import { BulkList } from 'components/pages/bulk';

export const Router: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/authenticate/:id" component={Authenticate} />
                <AuthRoute
                    path={`${accountRoute}/buckets`}
                    component={Buckets}
                />
                <AuthRoute path={`${accountRoute}/bulk`} component={BulkList} />
                <AuthRoute
                    path={`${categoryRoute}/list`}
                    component={CategoryList}
                />
                <AuthRoute
                    path={`${categoryRoute}/chart`}
                    component={CategoryChart}
                />
                <AuthRoute path="/:typeCreation" component={Main} />

                <AuthRoute path="/" component={Main} />
            </Switch>
        </HashRouter>
    );
};
