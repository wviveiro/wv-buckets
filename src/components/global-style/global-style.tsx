import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/**
 * Global CSS
 */
export const GlobalStyle = createGlobalStyle`
    
    html, body, #root {
      height: 100%;
      touch-action: pan-y;
      background-color: #202124;
    }

    * {
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }

    h1, h2 {
      font-weight: bold;
    }

    button, a {
      border: 0;
      background: none;
      text-decoration: none;

      &:focus {
        outline: none;
      }

      &:disabled {
        opacity: .5;
      }
    }

    .flex {
      display: flex;

      &.alignCenter {
        align-items: center;
      }

      &.justifyCenter {
        justify-content: center;
      }

      & > .flexGrow {
        flex-grow: 1;
      }
    }
  `;

/**
 * Main Theme
 */
const theme = {
  colors: {
    primary: 'var(--bs-primary)',
    danger: 'var(--bs-danger)',
    success: 'var(--bs-success)',
    background: '#202124',
    background2: 'rgb(28, 28, 28)',
    textWhite: '#FFF',
    textBlack: '#000',
    gray: 'rgba(120, 120, 120, 1)',
    gray2: 'rgba(255, 255, 255, 0.05)',
    selectedBackground: '#4d2975',
  },
  device: {
    padding:
      'env(safe-area-inset-top) env(safe-area-inset-right) calc(env(safe-area-inset-bottom) + 20px) env(safe-area-inset-left)',
    paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
};

export type GlobalStyleTheme = {
  colors: typeof theme.colors;
  device: typeof theme.device;
};

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}

/**
 * Main style and theme of application
 */
export const LayoutTheme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
