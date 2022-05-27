import React, { useState, useEffect } from 'react';
import { ReactFC } from 'components/common/types';
import { SplashScreen } from 'components/splash-screen';
import { loadGoogleScripts } from './utils';

export const LoadGoogleScripts: ReactFC = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadGoogleScripts().then(() => {
      setLoaded(true);
    });
  }, []);

  if (!loaded)
    return (
      <SplashScreen hasSpinner={true}>Loading Google scripts</SplashScreen>
    );

  return <>{children}</>;
};
