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
    }
  `;

/**
 * Main Theme
 */
const theme: GlobalStyleTheme = {
  colors: {
    primary: 'var(--bs-primary)',
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
