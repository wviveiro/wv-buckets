import styled, { css } from 'styled-components/macro';
import {
  BottomModalButtonProps,
  BottomModalProps,
} from './bottom-modal.interface';

export const bottomModalTransitionMilliseconds = 250;

export const BottomModalContainerInner = styled.div``;

export const BottomModalTitleContainer = styled.h2``;

export const BottomModalDisclaimer = styled.p``;

export const BottomModalContainer = styled.div<BottomModalProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  transition: background-color ${bottomModalTransitionMilliseconds}ms linear;

  ${(props) =>
    props.show
      ? css`
          background-color: rgba(0, 0, 0, 0.5);
        `
      : css`
          background-color: transparent;
        `}

  ${BottomModalTitleContainer} {
    margin-bottom: 20px;
  }

  ${BottomModalDisclaimer} {
    font-style: italic;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .main-container-menu {
    position: fixed;
    width: 100%;
    bottom: 0;
    transition: bottom ${bottomModalTransitionMilliseconds}ms linear;
    ${(props) =>
      props.show
        ? css`
            bottom: 0;
          `
        : css`
            bottom: -100vh;
          `}

    .main-content-bottom-modal {
      margin-bottom: 15px;
    }

    .menu-item {
      a,
      button {
        color: ${(props) => props.theme.colors.primary};
        border-top: solid 1px #eee;
        width: 100%;
        padding: 10px;
      }

      &:only-child {
        a,
        button {
          border-top: 0;
          padding: 0;
        }
      }
    }
  }

  ${BottomModalContainerInner} {
    color: ${(props) => props.theme.colors.textBlack};
    background: #fff;
    border-radius: 30px 30px 0 0;
    padding: 30px;
    text-align: center;
  }

  &.isMenu ${BottomModalContainerInner} {
    border-radius: 15px;
    margin: 0 15px;
    padding: 15px;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

export const BottomModalButton = styled.button<BottomModalButtonProps>`
  width: 100%;
  ${(props) =>
    !props.variant || props.variant === 'regular'
      ? css`
          color: #000;
          font-weight: bold;
          text-decoration: none;
        `
      : css`
          padding: 20px;
          background: ${props.variant === 'primary'
            ? props.theme.colors.background
            : props.theme.colors[props.variant]};
          color: ${(props) => props.theme.colors.textWhite};
          border: 0;
          border-radius: 5px;
          margin: 30px 0 10px;
          text-transform: uppercase;
        `}

  &:disabled {
    opacity: 0.5;
  }
`;
