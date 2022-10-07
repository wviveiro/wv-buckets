import React from "react";
import { BodyComponent } from "../../components/body-component";
import { MainContainer } from "../../components/main-container";
import { TitleComponent } from "../../components/title-component";

export const NewAccounts: React.FC = () => {
  return (
    <MainContainer>
      <TitleComponent
        title="Create account"
        subtitle="Register a new account"
      />
      <BodyComponent>
        <p>
          Copy Google spreadsheet URL and paste below to include it as an
          account
        </p>
      </BodyComponent>
    </MainContainer>
  );
};
