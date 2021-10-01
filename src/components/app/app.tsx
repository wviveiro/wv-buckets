import { Status } from 'components/util/status';
import React from 'react';
import { useAppState } from './app.hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import { LayoutTheme } from 'components/global-style';
import { SplashScreen } from 'components/splash-screen';

export const App: React.FC = () => {
  const { state } = useAppState();

  if (state.status === Status.initializing) {
    return (
      <LayoutTheme>
        <SplashScreen hasSpinner={true}>Initialising</SplashScreen>
      </LayoutTheme>
    );
  }

  return <div />;
};
