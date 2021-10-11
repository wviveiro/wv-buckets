export interface GlobalStyleTheme {
  colors: {
    primary: string;
    background: string;
    textWhite: string;
    textBlack: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}
