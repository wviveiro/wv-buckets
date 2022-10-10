import React, { useEffect } from "react";
import { LoginView } from "../pages/login-view";
import { NewAccounts } from "../pages/new-account";
import { AppContainer, GlobalStyle } from "./styled";

export const App: React.FC = () => {
  useEffect(() => {
    console.log("App");
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <LoginView />
    </AppContainer>
  );
};
