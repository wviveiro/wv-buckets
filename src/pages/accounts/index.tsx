import React from "react";
import { AccountCard } from "../../components/account-card";
import { BodyComponent } from "../../components/body-component";
import { HomeFooter } from "../../components/home-footer";
import { MainContainer } from "../../components/main-container";
import { TitleComponent } from "../../components/title-component";

export const Accounts: React.FC = () => {
  return (
    <MainContainer>
      <TitleComponent title="Accounts management" subtitle="List of accounts" />
      <BodyComponent>
        <AccountCard color="#007AFE" title="Main Account" amount={300} />
        <AccountCard color="#007AFE" title="Main Account" amount={300} />
      </BodyComponent>
      <HomeFooter />
    </MainContainer>
  );
};
