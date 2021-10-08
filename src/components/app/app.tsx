import { Status } from 'components/util/status';
import React from 'react';
import { useAppState } from './app.hook';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import { LayoutTheme } from 'components/global-style';
import { SplashScreen } from 'components/splash-screen';
import { Settings } from 'components/settings';
import { AlertsCreator } from 'components/alert';
import { Login } from 'components/login';

export const App: React.FC = () => {
  const { state } = useAppState();

  return (
    <LayoutTheme>
      {state.status === Status.initializing ? (
        <SplashScreen hasSpinner={true}>Initialising</SplashScreen>
      ) : !state.authenticated ? (
        <Settings />
      ) : (
        <Login />
      )}
      <AlertsCreator />
    </LayoutTheme>
  );
};
