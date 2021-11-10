import styled from 'styled-components/macro';

export const topSpacing = 50;

export const RowModalContainer = styled.div`
  .right-border {
    border-right: solid 2px ${(props) => props.theme.colors.gray2};
  }

  .button-close-modal {
    color: #fff;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.13);
    width: 30px;
    height: 30px;
    padding: 0;
  }

  .row-modal-selected-account {
    margin-top: 25px;
    display: flex;
    align-items: center;

    .account-details {
      flex-grow: 1;
      color: ${(props) => props.theme.colors.gray};

      h5 {
        font-size: 1rem;
        color: #fff;
      }
      span {
        font-size: 0.9rem;

        .icon {
          margin-right: 10px;
        }
      }
    }

    .account-more {
      .icon {
        color: #fff;
      }
    }
  }

  .account-row-details {
    margin-top: 30px;
  }

  .half-block {
    width: 50%;
  }

  .account-block {
    padding: 0 10px;

    strong {
      display: block;
      color: ${(props) => props.theme.colors.gray};
      font-weight: 500;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    span {
      color: #fff;
      font-weight: 100;
      font-size: 1.3rem;
    }
  }

  .input-description {
    width: 100%;
    border: 0;
    border-bottom: solid 2px ${(props) => props.theme.colors.gray2};
    background-color: transparent;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 100;

    &:focus {
      outline: none;
    }
  }

  .account-amount {
    font-size: 3rem;
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.colors.gray};
    position: relative;

    hr {
      opacity: 0;
      margin-bottom: 0;
    }

    .input-amount:focus ~ hr {
      opacity: 1;
    }

    .dollar-sign {
      font-size: 3.3rem;
    }

    .integer-part {
      color: #fff;
    }

    .input-amount {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      opacity: 0;
      display: block;
    }

    &.expense {
      color: rgba(140, 120, 120);

      .integer-part {
        color: rgba(255, 120, 120);
      }
    }
  }

  .add-row-button {
    background-color: ${(props) => props.theme.colors.background};
    width: 100%;
    margin-top: 30px;
    padding: 20px;
    border-radius: 5px;
  }
`;
