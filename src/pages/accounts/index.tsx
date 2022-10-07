import React from "react";
import { AccountCard } from "../../components/account-card";
import { BodyComponent } from "../../components/body-component";
import { FooterComponent } from "../../components/footer-component";
import { MainContainer } from "../../components/main-container";
import { TitleComponent } from "../../components/title-component";
import { IconButton } from "../../components/buttons/icon-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Accounts: React.FC = () => {
  return (
    <MainContainer>
      <TitleComponent title="Accounts management" subtitle="List of accounts" />
      <BodyComponent>
        <AccountCard color="#007AFE" title="Main Account" amount={300} />
        <AccountCard color="#007AFE" title="Main Account" amount={300} />
      </BodyComponent>
      <FooterComponent>
        <IconButton>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </FooterComponent>
    </MainContainer>
  );
};
