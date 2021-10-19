export interface GlobalStyleTheme {
  colors: {
    primary: string;
    danger: string;
    background: string;
    textWhite: string;
    textBlack: string;
  };
  device: {
    padding: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}
