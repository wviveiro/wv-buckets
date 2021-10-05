import styled, { CSSObject, css } from "styled-components/macro";

export const Grid = styled.div<{ flexWrap?: CSSObject["flex-wrap"] }>`
  display: flex;
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "wrap")};
  margin: 0 -10px;
`;

export const GridItem = styled.div<{ size?: number }>`
  padding: 0 10px;
  ${(props) =>
    props.size &&
    css`
      width: ${100 / props.size}%;
    `}
`;
