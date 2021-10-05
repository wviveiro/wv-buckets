import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AccountList } from '../account-list';
import { Accounts } from '../accounts';
import { Buckets } from '../buckets';
import { Login } from '../login';
import { MainProvider } from '../main-provider';
import { Settings } from '../settings';
import { AuthRoute } from './auth-route';

export const Router: React.FC = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthRoute path="/settings" component={Settings} />
          <AuthRoute path="/accounts" component={Accounts} />
          <AuthRoute path="/account-list" component={AccountList} />
          <AuthRoute path="/" component={Buckets} />
        </Switch>
      </BrowserRouter>
    </MainProvider>
  );
};
