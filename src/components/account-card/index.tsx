import React from "react";
import { formatToCurrency } from "../../utils/format-to-currency";
import {
  AccountCardAmount,
  AccountCardContainer,
  AccountCardTitle,
} from "./styled";
import { AccountCardProps } from "./types";

export const AccountCard: React.FC<AccountCardProps> = ({
  color,
  title,
  amount,
}) => {
  return (
    <AccountCardContainer color={color}>
      <AccountCardTitle>{title}</AccountCardTitle>
      <AccountCardAmount>{formatToCurrency(amount)}</AccountCardAmount>
    </AccountCardContainer>
  );
};
