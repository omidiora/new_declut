import styled from '@emotion/native';
import {
  TextStyle,
  ViewStyle,
  useWindowDimensions,
  TextProps,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {font} from '../theme/fonts';

export const TextSizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

export type TextSizesPropsType = typeof TextSizes;

export const lineHeight = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 36,
};

export const PaddingVertical = 80;

export const fontSize = TextSizes;

export var RFFontSize: TextSizesPropsType = TextSizes;
export var RFLineHeight: TextSizesPropsType = lineHeight;

Object.entries(TextSizes).forEach(([key, value]) => {
  RFFontSize = {...RFFontSize, [key]: RFValue(value)};
});

Object.entries(lineHeight).forEach(([key, value]) => {
  RFLineHeight = {...RFLineHeight, [key]: RFValue(value)};
});

export interface ThemeTextProps extends TextProps {
  fontSize?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
  color?: string;
  marginTop?: ViewStyle['marginTop'];
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  marginBottom?: ViewStyle['marginBottom'];

}

export const RegularText = styled.Text<ThemeTextProps>(
  ({
    theme,
    fontSize = 11,
    lineHeight = fontSize * 1.3,
    color = theme.colors.text,
    marginTop,
    textAlign,
    textTransform,
    marginBottom,
  }) => ({
    fontFamily: font.regular,
    fontSize: RFValue(fontSize),
    lineHeight: RFValue(lineHeight),
    color,
    marginTop,
    textAlign,
    marginBottom,
    textTransform,
  }),
);

export const MediumText = styled(RegularText)({
  fontFamily: font.medium,
});

export const SemiBoldText = styled(RegularText)({
  fontFamily: font.semiBold,
});

export const BoldText = styled(RegularText)({
  fontFamily: font.bold,
});


export const LighterText= styled(RegularText)({
  fontFamily: font.lighter,
});