import { Button } from 'components/ui-components/button';
import styled, { css } from 'styled-components';

export const ChartTypeButton = styled(Button)<{ 'data-active': boolean }>`
  padding: 10px;

  ${(props) =>
    props['data-active'] &&
    css`
      background: rgba(0, 0, 0, 0.5);
    `}
`;

export const ChartTypeContainer = styled.div`
  margin: 20px 10px;
  border: solid 1px #fff;
  display: flex;
  width: fit-content;
  border-radius: 10px;

  ${ChartTypeButton}:first-child {
    border-radius: 10px 0 0 10px;
  }

  ${ChartTypeButton}:last-child {
    border-radius: 0 10px 10px 0;
  }
`;
