import React from 'react';
import { RouteProps, Route } from 'react-router-dom';
import { AuthRouteProps } from './auth-route.interface';
import { Layout } from 'components/ui-components/layout';
import { useSelector } from 'react-redux';
import { selectAuth } from 'components/redux/selectors/auth';

export const AuthRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => <AuthComponent {...props} component={component} />}
    />
  );
};

const AuthComponent: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { signedin } = useSelector(selectAuth);

  if (!Component || !signedin) return null;

  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  );
};
