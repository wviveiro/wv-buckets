import styled, { css } from 'styled-components';

export const PageHeaderContainer = styled.div`
  ${(props) => css`
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    flex-shrink: 0;
    box-shadow: #000 0 0 1px 0;

    a {
      color: #fff;
      width: 40px;
      padding-left: calc(${props.theme.device.paddingLeft} + 10px);
    }

    h2 {
      margin: 0;
      font-weight: 400;
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 1rem;
    }
  `}
`;
