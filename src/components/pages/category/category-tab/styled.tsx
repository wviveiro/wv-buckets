import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
`;

export const TabButton = styled(Link)<{ active: boolean }>`
  color: inherit;
  ${({ active }) =>
    active &&
    css`
      background: #4d4f57;
    `}
`;
