export interface GlobalStyleTheme {
  colors: {
    primary: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalStyleTheme {}
}
