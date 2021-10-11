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

    h1, h2 {
      font-weight: bold;
    }
  `;

/**
 * Main Theme
 */
const theme: GlobalStyleTheme = {
  colors: {
    primary: 'var(--bs-primary)',
    background: '#3264a8',
    textWhite: '#FFF',
    textBlack: '#000',
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
