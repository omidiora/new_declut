import {Dimensions} from 'react-native';
import normalize from 'react-native-normalize';
const {width, height} = Dimensions.get('window');

const theme = true;

export const LIGHT_THEME = {
  variant: 'light',
  colors: {
    red: '#9A1725',
    primaryfade: '#C7B7D8',
    white:"#FFFFFF",
    primaryBlack:"#252D3C",
    lightBlack:"#5D6676",
    googleColor:"#3F525B",
    blue:"#0974AF",
    mainColor:"#02A89E",
    grey:"#F2F4F7",
    disabled:"#98A2B3",
    lightGrey:"#E4E7EC",
    bgColor:"#F9FAFB",
    secondaryBlack:"#344054",
    darkBlack:"#101828",
    mediumGrey:"#667085"
    

  },
};
export const DARK_THEME = {
  variant: 'dark',
  colors: {
    red: '#9A1725',
    primaryfade: '#C7B7D8',
    white:"#FFFFFF",
    primaryBlack:"#252D3C",
    lightBlack:"#5D6676",
    googleColor:"#3F525B",
    blue:"#0974AF",
    mainColor:"#02A89E",
    grey:"#F2F4F7",
    disabled:"#98A2B3",
    lightGrey:"#E4E7EC",
    bgColor:"#F9FAFB",
    secondaryBlack:"#344054",
    darkBlack:"#101828",
    mediumGrey:"#667085"

  },

};

// export const COLORS = {
//   red: '#9A1725',
//   primaryfade: '#C7B7D8',
// };

export const SIZES = {
  base: normalize(8),
  font: normalize(14),
  radius: normalize(12),
  padding: normalize(24),
  margin: normalize(24),
  h1: normalize(30),
  h2: normalize(20),
  h3: normalize(14),
  h4: normalize(12),
  body1: normalize(26),
  body2: normalize(22),
  body3: normalize(14),
  body4: normalize(12),
  body5: normalize(10),
  big1: normalize(100),
  logoHeight: normalize(60),
  logoWidth: normalize(180),
  orgLength: normalize(155),
  orgRadius: normalize(24),
  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: 'Poppins-Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
    // color: COLORS.textPrimary,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h2,
    // color: COLORS.textPrimary,
  },
  h3: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    // color: COLORS.textPrimary,
  },
  h4: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
    // color: COLORS.textPrimary,
  },
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
    // color: COLORS.textPrimary,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
    // color: COLORS.textPrimary,
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    // color: COLORS.textPrimary,
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
    // color: COLORS.textPrimary,
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
    // color: COLORS.textPrimary,
  },
  label: {fontWeight: '500', fontSize: SIZES.h3},
};

const appTheme = { SIZES, FONTS, theme};

export default appTheme;
