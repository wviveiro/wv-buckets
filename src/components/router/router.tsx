import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Accounts } from '../accounts';
import { AddRow } from '../add-row';
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
        <AuthRoute path="/add" component={AddRow} />
        <AuthRoute path="/accounts" component={Accounts} />
        <AuthRoute path="/" component={Buckets} />
      </Switch>
      <br />
      <Link to="/">Buckets</Link>
      <br />
      <Link to="/settings">Settings</Link>
      <br />
      <Link to="/add">Add Rows</Link>
      <br />
      <Link to="/accounts">Accounts</Link>
      <br />
      <br />
      <br />
      <br />
      <br />
    </BrowserRouter>
  );
};
