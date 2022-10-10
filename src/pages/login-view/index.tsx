import React from "react";
import { LoginButtton, LoginContainer } from "./styled";
import googleLogin from "../../assets/google-logo.svg";
import { useLoadGoogle } from "./services/use-load-google";

export const LoginView: React.FC = () => {
  useLoadGoogle();

  return (
    <LoginContainer>
      <LoginButtton>
        <img src={googleLogin} /> Login with Google
      </LoginButtton>
    </LoginContainer>
  );
};
