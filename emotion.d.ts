import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    dark: boolean;
    variant: 'dark' | 'light';
    colors: {
      primary: string;
      card: string;
      primaryBlack: string;
      notification: string;
      text: string;
      border: string;
      accent1: string;
      accent2: string;
      green: string;
      red: string;
      yellow: string;
      success: string;
      white: string;
      light: string;
      black: string;
      tertiary: string;
      lightBorder: string;
      lightGrey: string;
      borderLine: string;
      lightPrimary: string;
      darkPrimary: string;
      darkBrown: string;
      darkGray: string;
      tonedPrimary: string;
      tonedSecondary: string;
      lightTone: string;
      googleColor:string;
      blue:string;
      mainColor:string;
      grey:string;
      disabled:string;
      bgColor:string;
      secondaryBlack:string;
      mediumGrey:string;
    };
  }
}
