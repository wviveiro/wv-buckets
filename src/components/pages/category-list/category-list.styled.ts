import styled, { css } from 'styled-components';

export const CategoryListContainer = styled.div`
  padding: 10px;

  .category-available {
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    padding: 10px 0;

    h3 {
      font-size: 18px;
    }
  }

  .date-row {
    padding: 10px 0;

    h3 {
      font-size: 18px;
    }

    .date-row-header {
      display: flex;
      margin-bottom: 12px;
      strong {
        margin-right: 10px;
      }
    }

    .date-row-item {
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }
  }
`;

export const CurrencyTotal = styled.span<{ amount: number }>`
  font-weight: bold;
  ${({ amount, ...props }) =>
    amount < 0 &&
    css`
      color: ${props.theme.colors.danger};
    `}
`;

export const LineAmount = styled.div<{ amount: number }>`
  font-weight: bold;
  padding: 0px 5px;
  ${({ amount, ...props }) =>
    amount > 0 &&
    css`
      color: ${props.theme.colors.success};
      background-color: #b1f2d4;
      border-radius: 5px;
    `}
`;
