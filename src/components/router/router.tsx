import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { AccountList } from '../account-list';
import { Accounts } from '../accounts';
import { Buckets } from '../buckets';
import { Login } from '../login';
import { Settings } from '../settings';
import { AuthRoute } from './auth-route';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <AuthRoute path="/accounts" component={Accounts} />
        <AuthRoute path="/account-list" component={AccountList} />
        <AuthRoute path="/" component={Buckets} />
      </Switch>
    </BrowserRouter>
  );
};
