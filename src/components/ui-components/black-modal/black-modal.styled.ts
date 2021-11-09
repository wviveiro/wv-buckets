import styled, { css } from 'styled-components/macro';
import { BlackModalStyledInterface } from './black-modal.interface';

export const blackModalTransitionTime = 250;
export const topSpacing = 50;

export const BlackModalContainer = styled.div<BlackModalStyledInterface>`
  ${(props) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    ${props.noBackground &&
    css`
      background-color: rgba(0, 0, 0, ${props.show ? 0.7 : 0});
    `}

    transition: background-color ${blackModalTransitionTime}ms ease-in;

    .row-modal-inner {
      background-color: rgb(28, 28, 28);
      position: fixed;
      height: calc(100% - ${topSpacing}px);
      width: 100%;
      border-radius: 15px 15px 0 0;
      color: #fff;
      padding: 30px 20px;
      padding-bottom: ${(props) => props.theme.device.paddingBottom};
      transition: bottom ${blackModalTransitionTime}ms ease-in;

      bottom: ${props.show ? 0 : '-100vh'};
    }

    hr {
      background-color: ${props.theme.colors.gray2};
      opacity: 1;
      height: 2px;
    }
  `}
`;

export const BlackModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .black-modal-title-left-button,
  .black-modal-title-right-button {
    button {
      color: #fff;
    }
  }

  h4 {
    flex-grow: 1;
    padding: 0 10px;
    margin: 0;
  }
`;
