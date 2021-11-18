export interface GlobalStyleTheme {
  colors: {
    primary: string;
    danger: string;
    success: string;
    background: string;
    background2: string;
    textWhite: string;
    textBlack: string;
    gray: string;
    gray2: string;
  };
  device: {
    padding: string;
    paddingBottom: string;
    paddingTop: string;
    paddingLeft: string;
    paddingRight: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}
