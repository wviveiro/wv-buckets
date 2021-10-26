import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { AuthRoute } from './auth-route';
import { Main } from 'components/accounts';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <AuthRoute path="/:typeCreation" component={Main} />
        <AuthRoute path="/" component={Main} />
      </Switch>
    </HashRouter>
  );
};
