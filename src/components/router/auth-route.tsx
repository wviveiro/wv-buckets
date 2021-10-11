import React from 'react';
import { useAppContext } from 'components/app/app.hook';
import { RouteProps, Route } from 'react-router-dom';
import { AuthRouteProps } from './auth-route.interface';

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
  const { signedin } = useAppContext();

  if (!Component || !signedin) return null;

  return <Component {...rest} />;
};
