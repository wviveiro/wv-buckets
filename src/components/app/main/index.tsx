import { Login } from 'components/pages/login';
import { Router } from 'components/router';
import { Settings } from 'components/settings';
import { SplashScreen } from 'components/splash-screen';
import { Status } from 'components/util/status';
import React from 'react';
import { useMainState } from './main.hook';

export const Main: React.FC = () => {
  const { state } = useMainState();

  if (state.status === Status.initializing)
    return <SplashScreen hasSpinner={true}>Initialising</SplashScreen>;

  if (!state.authenticated) return <Settings />;

  if (!state.signedin) return <Login />;

  return <Router />;
};
