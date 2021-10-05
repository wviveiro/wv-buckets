import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { Layout } from '../../ui-components/layout/layout';
import { Loading } from '../loading';
import { MainProvider, useMainProvider } from '../main-provider';
import { Status } from '../statuses/statuses.interface';

interface WrapperComponentProps extends RouteComponentProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const WrapperComponent: React.FC<WrapperComponentProps> = ({
  component: Component,
  ...props
}) => {
  const { status, signedin } = useMainProvider();

  if (status === Status.initializing) {
    return <Loading>Authenticating</Loading>;
  }

  if (!signedin) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export const AuthRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <WrapperComponent
          {...props}
          component={Component as React.ComponentType<RouteComponentProps<any>>}
        />
      )}
    />
  );
};
