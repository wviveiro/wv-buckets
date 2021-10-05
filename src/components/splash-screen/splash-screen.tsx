import * as React from 'react';
import { SplashScreenInterface } from './splash-screen.interface';
import { SplashScreenContainer } from './splash-screen.styled';

export const SplashScreen: React.FC<SplashScreenInterface> = ({
  hasSpinner,
  children,
}) => {
  return (
    <SplashScreenContainer>
      <div className="splash-screen-inner">
        {hasSpinner && (
          <i className="fas fa-fan fa-spin splash-screen-spinner" />
        )}
        {children}
      </div>
    </SplashScreenContainer>
  );
};
