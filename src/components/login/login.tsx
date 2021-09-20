import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loading } from '../loading';
import { Settings } from '../settings';
import { Status } from '../statuses/statuses.interface';
import { useLoginState } from './login.hook';

export const Login: React.FC = () => {
  const { state, onAuthenticate, handleSignin } = useLoginState();

  if (state.status === Status.initializing) {
    return <Loading>Authenticating</Loading>;
  }

  if (!state.authenticated) {
    return <Settings onAuthenticate={onAuthenticate} />;
  }

  if (state.signedin) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <p>
        Good news, the <strong>google api</strong> is authenticated. Now you
        just need to login!
      </p>
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};
