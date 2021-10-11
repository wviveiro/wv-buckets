import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthRoute } from './auth-route';
import { Main } from 'components/main';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/:typeCreation" component={Main} />
        <AuthRoute path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
