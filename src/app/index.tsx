import React from "react";
import { NewAccounts } from "../pages/new-account";
import { AppContainer, GlobalStyle } from "./styled";

export const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <NewAccounts />
    </AppContainer>
  );
};
