import { zIndex } from 'components/util/z-index';
import styled, { css } from 'styled-components/macro';
import { bottomModalTransitionMilliseconds } from '../bottom-modal/bottom-modal.styled';

export const DateModalContainer = styled.div<{ open: boolean }>`
  position: fixed;
  background-color: transparent;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color ${bottomModalTransitionMilliseconds}ms linear;
  z-index: ${zIndex.dateModal};
  ${(props) =>
    props.open &&
    css`
      pointer-events: unset;
      background-color: rgba(0, 0, 0, 0.5);
    `}
`;

export const DateModalInner = styled.div<{ open: boolean }>`
  ${(props) => css`
    position: fixed;
    bottom: -100vh;
    width: 100%;
    margin-bottom: ${props.theme.device.paddingBottom};
    transition: bottom ${bottomModalTransitionMilliseconds}ms linear;

    ${props.open &&
    css`
      bottom: 0;
    `}

    & > div {
      width: calc(100% - 40px);
      background-color: ${props.theme.colors.background2};
      padding: 20px;
      margin: 0 auto;
      border-radius: 15px;
    }

    .date-modal-picker {
      width: 100%;
      border: 0;
      background-color: unset;

      .react-datepicker__month-container {
        width: 100%;
        color: #fff;

        .react-datepicker__header {
          background-color: unset;
          border: 0;
          padding-top: 0;

          .react-datepicker__current-month {
            color: #fff;
            font-size: 1.1rem;
            margin-bottom: 20px;
          }

          .react-datepicker__day-names {
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .react-datepicker__day-name {
              color: #fff;
              width: 2.2rem;
              line-height: 2.2rem;
            }
          }
        }

        .react-datepicker__month {
          .react-datepicker__week {
            font-size: 1rem;
            display: flex;
            justify-content: space-between;

            .react-datepicker__day {
              color: rgba(255, 255, 255, 0.7);
              width: 2.2rem;
              line-height: 2.2rem;
              margin: 0;

              &:focus {
                outline: none;
              }

              &.react-datepicker__day--outside-month {
                color: rgba(255, 255, 255, 0.2);
              }

              &.react-datepicker__day--keyboard-selected,
              &:hover {
                background-color: unset;
              }

              &.react-datepicker__day--selected {
                background-color: ${props.theme.colors.selectedBackground};
                color: #fff;
              }
            }
          }
        }
      }
    }
  `}
`;

export const DateModalButtonsContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 40px);

  button {
    margin-top: 20px;
    width: 100%;
  }

  .button-accept {
    background-color: ${(props) => props.theme.colors.background};
    padding: 10px;
    color: #fff;
  }

  .button-cancel {
    color: #fff;
  }
`;
