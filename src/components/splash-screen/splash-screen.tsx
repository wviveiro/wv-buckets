import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { SplashScreenInterface } from './splash-screen.interface';
import { SplashScreenContainer } from './splash-screen.styled';
import { faFan } from '@fortawesome/free-solid-svg-icons';

export const SplashScreen: React.FC<SplashScreenInterface> = ({
  hasSpinner,
  children,
}) => {
  return (
    <SplashScreenContainer>
      <div className="splash-screen-inner">
        {hasSpinner && (
          <div>
            <FontAwesomeIcon
              icon={faFan}
              spin
              className="splash-screen-spinner"
            />
          </div>
        )}
        {children}
      </div>
    </SplashScreenContainer>
  );
};
