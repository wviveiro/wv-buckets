import styled, { css } from 'styled-components';

export const PageHeaderContainer = styled.div`
  ${(props) => css`
    display: flex;
    align-items: center;
    height: 50px;
    width: calc(100% - 50px);

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
    }
  `}
`;
