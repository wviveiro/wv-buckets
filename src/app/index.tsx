import React from "react";
import { AuthContainer } from "../components/auth-container";
import { Router } from "../components/router";
import { LoginView } from "../pages/login-view";
import { AppContainer, GlobalStyle } from "./styled";

export const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <AuthContainer unAuthChildren={<LoginView />}>
        <Router />
      </AuthContainer>
    </AppContainer>
  );
};
