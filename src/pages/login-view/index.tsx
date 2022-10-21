import React from "react";
import { LoginButtton, LoginContainer } from "./styled";
import googleLogin from "../../assets/google-logo.svg";
import { useLoadGoogle } from "../../services/use-load-google";

export const LoginView: React.FC = () => {
  const { disabled, onClickGoogleButton } = useLoadGoogle();

  return (
    <LoginContainer>
      <LoginButtton disabled={disabled} onClick={onClickGoogleButton}>
        <img src={googleLogin} /> Login with Google
      </LoginButtton>
    </LoginContainer>
  );
};
