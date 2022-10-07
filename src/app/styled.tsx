import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;


    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  html, body, #root {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  div {
    box-sizing: border-box;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`;
