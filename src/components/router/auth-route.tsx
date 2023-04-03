import React from 'react';
import { RouteProps, Route } from 'react-router-dom';
import { AuthRouteProps } from './auth-route.interface';
import { Layout } from 'components/ui-components/layout';
import { useMainState } from 'components/app/main/main.hook';
import { Status } from 'components/util/status';
import { SplashScreen } from 'components/splash-screen';
import { Login } from 'components/pages/login';

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
  const { state } = useMainState();

  if (state.status === Status.initializing)
    return <SplashScreen hasSpinner={true}>Initialising</SplashScreen>;

  if (!state.signedin) return <Login />;

  if (!Component) return null;

  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  );
};
