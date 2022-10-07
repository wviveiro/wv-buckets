import React from "react";
import { TitleContainer, TitleH1, TitleH2 } from "./styled";
import { TitleComponentProps } from "./types";

export const TitleComponent: React.FC<TitleComponentProps> = ({
  title,
  subtitle,
}) => {
  return (
    <TitleContainer>
      <TitleH1>{title}</TitleH1>
      {subtitle && <TitleH2>{subtitle}</TitleH2>}
    </TitleContainer>
  );
};
