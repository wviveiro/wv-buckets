import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { AuthRoute } from './auth-route';
import { Main } from 'components/pages/accounts';
import { Buckets } from 'components/pages/buckets/buckets';
import { CategoryList } from 'components/pages/category/category-list';
import { Authenticate } from 'components/pages/authenticate';
import { CategoryChart } from 'components/pages/category/category-chart';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/authenticate/:id" component={Authenticate} />
        <AuthRoute path="/accounts/:accountid/buckets" component={Buckets} />
        <AuthRoute
          path="/accounts/:accountid/category/:category/list"
          component={CategoryList}
        />
        <AuthRoute
          path="/accounts/:accountid/category/:category/chart"
          component={CategoryChart}
        />
        <AuthRoute path="/:typeCreation" component={Main} />

        <AuthRoute path="/" component={Main} />
      </Switch>
    </HashRouter>
  );
};
