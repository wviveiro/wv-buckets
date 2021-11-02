import styled, { css } from 'styled-components/macro';
import { TogglerProps } from './toggler.interface';

export const TogglerContainer = styled.div<TogglerProps>`
  ${(props) => {
    const width = 100 / (props.options.length || 1);
    const left = props.options.findIndex(
      (option) => option.value === props.value
    );

    const padding = 5;

    return css`
      background: #000;
      width: 80%;
      margin: 20px auto;
      border-radius: 5px;
      display: flex;
      position: relative;

      .toggler-option-container {
        width: ${width}%;
        text-align: center;
        z-index: 1;

        .toggler-option-button {
          color: #fff;
          padding: 15px 10px;
          border-radius: 5px;
          width: 100%;
        }
      }

      ${left >= 0 &&
      css`
        &:before {
          border-radius: 5px;
          content: '';
          display: block;
          background: rgb(28, 28, 28);
          position: absolute;
          top: ${padding}px;
          left: calc(${width * left}% + ${padding}px);
          bottom: ${padding}px;
          width: calc(${width}% - ${padding * 2}px);
          transition: left 0.25s ease-out;
        }
      `}
    `;
  }}
`;
