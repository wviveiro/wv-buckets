import styled, { css } from 'styled-components/macro';

const topSpacing = 50;

const gray = 'rgba(120, 120, 120, 1)';
const gray2 = 'rgba(255, 255, 255, 0.05)';

export const RowModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);

  hr {
    background-color: ${gray2};
    opacity: 1;
    height: 2px;
  }

  .right-border {
    border-right: solid 2px ${gray2};
  }

  .row-modal-inner {
    background-color: rgb(28, 28, 28);
    position: fixed;
    top: ${topSpacing}px;
    bottom: 0;
    width: 100%;
    border-radius: 15px 15px 0 0;
    color: #fff;
    padding: 30px 20px;
    padding-bottom: ${(props) => props.theme.device.paddingBottom};

    .row-modal-title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h4 {
        font-size: 1.2rem;
      }

      .button-close-modal {
        color: #fff;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.13);
        width: 30px;
        height: 30px;
        padding: 0;
      }
    }

    .row-modal-selected-account {
      margin-top: 25px;
      display: flex;
      align-items: center;

      .account-details {
        flex-grow: 1;
        h5 {
          font-size: 1rem;
        }
        span {
          color: ${gray};
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
        color: ${gray};
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 10px;
      }

      span {
        font-weight: 100;
        font-size: 1.3rem;
      }
    }

    .input-description {
      width: 100%;
      border: 0;
      border-bottom: solid 2px ${gray2};
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
      color: ${gray};
      position: relative;

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
    }
  }
`;

const paddingSwitch = 5;
export const Switcher = styled.div<{ active?: number; length: number }>`
  background: #000;
  width: 80%;
  margin: 20px auto;
  border-radius: 5px;
  display: flex;
  position: relative;
  padding: ${paddingSwitch}px;

  ${(props) =>
    props.active !== undefined &&
    css`
      &:before {
        content: '';
        background: rgb(28, 28, 28);
        top: ${paddingSwitch}px;
        left: ${props.active === 0
          ? `${paddingSwitch}px`
          : props.active === props.length - 1
          ? `calc(${100 / props.length}% - ${paddingSwitch}px)`
          : `${100 / props.length}%`};
        width: calc(${100 / props.length}% - ${paddingSwitch}px);
        bottom: ${paddingSwitch}px;
        position: absolute;
        border-radius: ${paddingSwitch}px;
        z-index: 0;
        transition: left 0.5s ease-out;
      }
    `}

  .switch-item {
    width: 50%;
    text-align: center;
    z-index: 1;
    .switch-button {
      color: #fff;
      padding: 10px;
      border-radius: 5px;
      width: 100%;
    }
  }
`;
