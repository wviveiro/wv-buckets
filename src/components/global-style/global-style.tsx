import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { GlobalStyleTheme } from './global-style.interface';

/**
 * Global CSS
 */
export const GlobalStyle = createGlobalStyle`
    
    html, body, #root {
      height: 100%;
    }

    * {
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }

    html {
      padding: ${(props) => props.theme.device.padding};
    }

    h1, h2 {
      font-weight: bold;
    }

    button, a {
      border: 0;
      background: none;
      text-decoration: none;
    }
  `;

/**
 * Main Theme
 */
const theme: GlobalStyleTheme = {
  colors: {
    primary: 'var(--bs-primary)',
    danger: 'var(--bs-danger)',
    background: '#3264a8',
    textWhite: '#FFF',
    textBlack: '#000',
  },
  device: {
    padding:
      'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
};

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
