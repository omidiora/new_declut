import styled from '@emotion/native';
import {Theme} from '@emotion/react';
import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import React from 'react';
import {
  ColorValue,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  RFFontSize,
  fontSize,
  RegularText,
  ThemeTextProps,
  RFLineHeight,
} from '../../utils/text';
import {font} from '../../utils/theme/fonts';
import {widthPixel, heightPixel} from '../../utils/theme/pxToDpConvert';

export const InputColorState = (
  theme: Theme,
  active?: boolean,
  error?: boolean,
) => {
  return {
    borderColor: error
      ? theme.colors.notification
      : active
      ? theme.colors.primary
      : theme.colors.border,
    backgroundColor: error
      ? 'rgba(235, 32, 39, 0.1)'
      : active
      ? theme.colors.background
      : theme.colors.card,
  };
};

export interface InputWrapperProps extends TextInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  editable?: boolean;
  placeholder?: string;
  color?: ColorValue;
  label?: string;
  labelStyle?: TextStyle;
  labelProps?: ThemeTextProps;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  bottomText?: string;
  bottomTextProps?: ThemeTextProps;
  inputError?: boolean;
  bottomTextOnError?: boolean;
  solid?: boolean;
  onPress?: () => void;
  setIsFocused?: () => void;
  setIsBlur?: () => void;
}
export const InputWrapperBox: React.FC<InputWrapperProps> = ({
  leftIcon,
  rightIcon,
  label,
  color,
  editable = true,
  labelStyle,
  labelProps,
  containerStyle,
  contentContainerStyle,
  placeholder,
  bottomText,
  bottomTextProps,
  bottomTextOnError = true,
  inputError = false,
  onPress,
  solid = false,
  setIsFocused,
  setIsBlur,
  ...rest
}) => {
  const {colors} = useTheme();
  const [active, setActive] = useState<boolean>(Boolean(rest.value));

  return (
    <View style={{flexDirection: 'column', ...contentContainerStyle}}>
      {label ? (
        <Label style={labelStyle} {...labelProps}>
          {label}
        </Label>
      ) : null}
      <InputWrapper
        active={active || !editable}
        error={inputError}
        solid={solid}
        style={containerStyle}>
        {leftIcon}
        <InputBox
          {...rest}
          color={color}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor="#667085"
          onFocus={() => {
            setActive(true);
            setIsFocused();
          }}
          onBlur={() => {
            setActive(false);
            setIsBlur();
          }}
          onPressIn={onPress}
        />
        {rightIcon}
      </InputWrapper>
      {(bottomText && !bottomTextOnError) ||
      (bottomText && bottomTextOnError && inputError) ? (
        <BottomText
          color={inputError ? 'red' : colors.text}
          {...bottomTextProps}>
          {bottomText}
        </BottomText>
      ) : null}
    </View>
  );
};

export const InputBox = styled.TextInput<{
  color?: ColorValue;
}>(({theme, color}) => ({
  color,
  fontSize: RFFontSize.sm,
  lineHeight: RFFontSize.sm + 0.5,
  fontFamily: font.semiBold,
  borderWidth: 0,
  flexGrow: 1,
  flex: 1,
  paddingHorizontal: 7,
  
  // backgroundColor: "indigo",
}));

export const InputWrapper = styled.View<{
  active?: boolean;
  error?: boolean;
  solid?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}>(
  ({
    theme,
    active,
    error,
    solid,
    borderColor,
    backgroundColor,
    // borderRadius = 50
    borderRadius = 10,
  }) => ({
    // opacity: solid ? 1 : 0.5,
    paddingHorizontal: 10,
    // paddingVertical: Platform.OS == "android" ? 12 : 12,
    marginBottom: heightPixel(15),
    borderWidth: 0.5,
    borderRadius,
    minHeight: RFValue(43),
    // borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...InputColorState(theme, active, error),
  }),
);

export const BottomText = styled(RegularText)({
  paddingLeft: widthPixel(15),
  paddingBottom: heightPixel(10),
});

export const Label = styled(RegularText)<{color?: string}>(({color}) => ({
  fontFamily: font.semiBold,
  fontSize: 14,
  lineHeight: 20,
  color: color ?? 'rgba(48, 48, 48, 1)',
  paddingBottom: heightPixel(10),
  // paddingLeft: widthPixel(10),
}));

export const InputIconBox = styled.View({
  paddingHorizontal: widthPixel(10),
});
