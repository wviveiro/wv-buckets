import React from "react";
import { LoginButtton, LoginContainer } from "./styled";
import googleLogin from "../../assets/google-logo.svg";

export const LoginView: React.FC = () => {
  return (
    <LoginContainer>
      <LoginButtton>
        <img src={googleLogin} /> Login with Google
      </LoginButtton>
    </LoginContainer>
  );
};
