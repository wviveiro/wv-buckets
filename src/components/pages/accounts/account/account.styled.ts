import styled from 'styled-components/macro';

export const AccountContainer = styled.div`
  background: #fff;
  color: #000;
  display: flex;
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  position: relative;

  .loading-account {
    color: #ccc;
    width: 100%;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .icon-area {
    width: 30px;

    .icon {
      display: block;
    }
  }

  .account-details {
    color: #aaa;
    flex-grow: 1;
    width: calc(100% - 30px);

    h4 {
      color: #000;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0;
      flex-grow: 1;
    }

    .account-id {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }

    .account-summary {
      margin-top: 10px;
      font-size: 0.9rem;
      .account-summary-line {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .total-summary {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }

  .button-more {
    position: absolute;
    right: 5px;
    top: 0px;
    font-size: 1rem;
  }
`;

export const AccountBalance = styled.span<{ negative?: boolean }>`
  color: ${(props) => (props.negative ? props.theme.colors.danger : '#fff')};
`;
