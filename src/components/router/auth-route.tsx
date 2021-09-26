import React, { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { Layout } from '../../ui-components/layout/layout';
import { Loading } from '../loading';
import { isAppAuthenticated, subscribeUserStatus } from '../settings';
import { Status } from '../statuses/statuses.interface';

interface WrapperComponentProps extends RouteComponentProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const WrapperComponent: React.FC<WrapperComponentProps> = ({
  component: Component,
  ...props
}) => {
  const [state, setState] = useCreateState({
    status: Status.initializing,
    signedin: false,
  });

  useEffect(() => {
    isAppAuthenticated()
      .then(({ isSignedIn }) => {
        setState({
          status: Status.loaded,
          signedin: isSignedIn,
        });
      })
      .catch((reason) => {
        alert(reason.message);
        setState({
          status: Status.loaded,
          signedin: false,
        });
      });
  }, [setState]);

  useEffect(() => {
    let mounted = true;
    subscribeUserStatus((signedin) => {
      if (!mounted) return;
      setState({ signedin });
    });
    return () => {
      mounted = false;
    };
  }, [setState]);

  if (state.status !== Status.loaded) {
    return <Loading>Authenticating</Loading>;
  }

  if (!state.signedin) {
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
