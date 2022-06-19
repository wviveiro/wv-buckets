import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

export const BucketsContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
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

export const BucketItem = styled(Link)<{ total: number }>`
  ${(props) => css`
    width: 50%;
    height: 100px;
    color: #fff;

    & > .bucket-inner {
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      height: calc(100% - 20px);
      background-color: rgba(255, 255, 255, 0.01);

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
