import styled, { css } from 'styled-components/macro';
import { BottomModalProps } from './bottom-modal.interface';

export const bottomModalTransitionMilliseconds = 250;

export const BottomModalContainerInner = styled.div``;

export const BottomModalTitleContainer = styled.h2``;

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

  ${BottomModalContainerInner} {
    color: ${(props) => props.theme.colors.textBlack};
    background: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
    border-radius: 30px 30px 0 0;
    padding: 30px;
    text-align: center;
    transition: bottom ${bottomModalTransitionMilliseconds}ms linear;
    ${(props) =>
      props.show
        ? css`
            bottom: 0;
          `
        : css`
            bottom: -100vh;
          `}
  }
`;
