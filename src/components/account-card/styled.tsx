import styled from "styled-components";

export const AccountCardContainer = styled.div<{ color: string }>`
  border-radius: 12px;
  padding: 18px;
  margin: 8px;
  background-color: ${({ color }) => color};
`;

export const AccountCardTitle = styled.h3`
  color: #fff;
  font-size: 14px;
  font-weight: 100;
  margin: 0;
`;

export const AccountCardAmount = styled.h4`
  color: #fff;
  font-size: 21px;
  font-weight: 500;
  margin: 0;
  margin-top: 8px;
`;
