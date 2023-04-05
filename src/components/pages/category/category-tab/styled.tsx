import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  background-color: #000;
  box-shadow: #000 0 0 1px 0;
`;

export const TabButton = styled(Link)<{ 'data-active': boolean }>`
  color: inherit;
  padding: 4px 12px;

  &:active,
  &:hover {
    color: inherit;
  }

  ${({ theme, ...props }) =>
    props['data-active'] &&
    css`
      background: ${theme.colors.background};
    `}
`;
