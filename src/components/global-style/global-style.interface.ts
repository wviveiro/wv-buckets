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
    paddingBottom: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}
