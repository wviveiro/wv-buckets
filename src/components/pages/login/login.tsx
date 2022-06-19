import React from 'react';
import { LoginButtton, LoginContainer } from './login.styled';
import { ReactComponent as GoogleLogin } from 'components/images/btn_google_light_normal_ios.svg';
import { useLoginState } from './login.hook';

export const Login: React.FC = () => {
  const { state, onLogin } = useLoginState();

  return (
    <LoginContainer>
      <LoginButtton disabled={state.disabled} onClick={onLogin}>
        <GoogleLogin /> Login with Google
      </LoginButtton>
    </LoginContainer>
  );
};
