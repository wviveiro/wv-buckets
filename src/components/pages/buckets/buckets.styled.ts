import styled, { css } from 'styled-components/macro';

export const BucketsContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

export const BucketsHeader = styled.div`
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

export const BucketErrorContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-style: italic;
`;
