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

export const BucketContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: auto;

  & > .flex {
    flex-wrap: wrap;
  }
`;

export const BucketItem = styled.div<{ total: number }>`
  ${(props) => css`
    width: 50%;
    height: 100px;

    & > .bucket-inner {
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      padding: 10px;
      margin: 10px;
      height: calc(100% - 20px);
      background-color: rgba(255, 255, 255, 0.1);

      .bucket-name {
        h3 {
          font-size: 1rem;
        }
      }

      .bucket-price {
        strong {
          font-size: 1.2rem;
          font-weight: 400;

          color: ${props.total > 0
            ? props.theme.colors.success
            : props.theme.colors.danger};
        }
      }
    }

    &:nth-child(even) > .bucket-inner {
      margin-left: 5px;
    }
    &:nth-child(odd) > .bucket-inner {
      margin-right: 5px;
    }
  `}
`;
