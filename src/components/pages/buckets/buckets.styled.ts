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

export const AddButton = styled.button`
  color: #fff;
  font-size: 11px;
`;

export const BucketItem = styled(Link)<{ total: number }>`
  ${(props) => css`
    width: 50%;
    color: #fff;
    position: relative;

    & > .bucket-inner {
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      height: calc(100% - 20px);
      background-color: rgba(255, 255, 255, 0.01);
      position: relative;

      .bucket-name {
        display: flex;
        align-items: center;
        margin: 10px;
        h3 {
          font-size: 1rem;
          flex-grow: 1;
          margin: 0;
          color: #fff;
          max-width: 50px;
        }

        ${AddButton} {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 25px;
          height: 25px;
          // border: solid 1px #f00;
          padding: 0;

          svg {
            width: 15px;
            height: 15px;
          }
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
