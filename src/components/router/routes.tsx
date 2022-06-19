import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { AuthRoute } from './auth-route';
import { Main } from 'components/pages/accounts';
import { Buckets } from 'components/pages/buckets/buckets';
import { CategoryList } from 'components/pages/category-list';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <AuthRoute path="/accounts/:accountid/buckets" component={Buckets} />
        <AuthRoute
          path="/accounts/:accountid/category/:category/list"
          component={CategoryList}
        />
        <AuthRoute path="/:typeCreation" component={Main} />
        <AuthRoute path="/" component={Main} />
      </Switch>
    </HashRouter>
  );
};
