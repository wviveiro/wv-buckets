import { Status } from 'components/util/status';
import React from 'react';
import { AppContext, useAppState } from './app.hook';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import { LayoutTheme } from 'components/global-style';
import { SplashScreen } from 'components/splash-screen';
import { Settings } from 'components/settings';
import { AlertsCreator } from 'components/alert';
import { Router } from 'components/router';
import { Login } from 'components/login';

export const App: React.FC = () => {
  const { state, onAddAccount } = useAppState();

  return (
    <AppContext.Provider
      value={{
        ...state,
        onAddAccount,
      }}
    >
      <LayoutTheme>
        {state.status === Status.initializing ? (
          <SplashScreen hasSpinner={true}>Initialising</SplashScreen>
        ) : !state.authenticated ? (
          <Settings />
        ) : !state.signedin ? (
          <Login />
        ) : (
          <Router />
        )}
        <AlertsCreator />
      </LayoutTheme>
    </AppContext.Provider>
  );
};
