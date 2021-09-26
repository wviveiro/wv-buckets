import React from 'react';
import { normalize } from 'styled-normalize';
import {
  createGlobalStyle,
  ThemeProvider,
  css,
  DefaultTheme,
} from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      danger: string;
      success: string;
      grey: string;
      modalbox: string;
      bgmodal: string;
    };
  }
}

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html, body, #root {
      height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    button {
        border: unset;
        background: unset;
      &.navbar-toggler {
        border: unset;
      }
      &:focus, &.navbar-toggler:focus {
        outline: none;
        box-shadow: none;
        border-color: unset
      }
    }

    // Text color scheme
    ${['danger', 'success'].map(
      (color) => css`
        .text-${color} {
          color: ${(props) =>
            props.theme.colors[color as keyof DefaultTheme['colors']]};
        }
      `
    )}
`;

const theme: DefaultTheme = {
  colors: {
    danger: '#C00',
    success: '#0C0',
    grey: '#999',
    modalbox: '#FFF',
    bgmodal: 'rgba(0,0,0,.2)',
  },
};

export const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
