import React, {ReactNode} from 'react';
import styled from '@emotion/native';
import {useTheme, Theme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Button as Btn} from '@rneui/base';

import {RFValue} from 'react-native-responsive-fontsize';
import styles from './button.styles';
import {BoldText, SemiBoldText, fontSize} from '../../../utils/text';
import {widthPixel} from '../../../utils/theme/pxToDpConvert';

const padding = wp(3.5);

interface CustomTheme extends Theme {
  accent1?: string;
  accent2?: string;
}

interface ButtonStyleProps {
  borderColor?: string;
  backgroundColor: string;
}

interface ButtonStylePropsExtra {
  backgroundColor: string | ColorValue;
  borderColor?: string;
}

const SolidView = styled.TouchableOpacity<ButtonStylePropsExtra>(
  ({backgroundColor, borderColor, disabled}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    borderColor,
    // paddingVertical: RFValue(15),
    maxHeight: 70,
    opacity: disabled ? 0.7 : 1,
     height:58,
    borderRadius: 13,
  }),
);

export const FloatBtnView = styled.View({
  position: 'absolute',
  width: '100%',
  paddingHorizontal: 15,
  flexDirection: 'column',
  alignSelf: 'center',
  bottom: 0,
});

const Text = styled(SemiBoldText)(
  {
    textAlign: 'center',
  },
  props => ({
    color: props.color,
    paddingHorizontal: widthPixel(15),
  }),
);

const OutlineView = styled(SolidView)({
  borderWidth: 2,
});

interface ButtonProps {
  onPress?: () => void;
  text?: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactElement;
  color?: string;
  backgroundColor?: ColorValue;
  backgroundLoadingColor?: ColorValue;
  children?: ReactNode;
}

interface NewButtonProps {
  title: string;
  opaque?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fontSize?: number;
  titleElement?: any;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  isLoading,
  text,
  onPress,
  style,
  textStyle,
  disabled,
  color,
  backgroundColor,
  backgroundLoadingColor = '#02A89E',
  children,
}) => {
  const {colors} = useTheme();

  return (
    <SolidView
      activeOpacity={0.7}
      // onPress={onPress}
      onPressOut={onPress}
      disabled={disabled || isLoading}
      backgroundColor={
        isLoading ? backgroundLoadingColor : backgroundColor ?? colors.primary
      }
      style={style}>
      {!isLoading ? (
        children ?? (
          <Text
            color={color || '#ffffff'}
            style={{
              fontSize: fontSize.md,
              padding: 10,
              paddingBottom: 3,
              ...textStyle,
            }}>
            {text}
          </Text>
        )
      ) : (
        <ActivityIndicator color="#fff" animating={isLoading} size="small" />
      )}
    </SolidView>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  isLoading,
  text,
  onPress,
  style,
  textStyle,
  icon,
  disabled,
  color,
}) => {
  const {colors}: CustomTheme = useTheme();

  return (
    <OutlineView
      backgroundColor="transparent"
      borderColor={"#9A1725"}
      style={style}
      activeOpacity={0.7}
      // onPress={onPress}
      onPressOut={onPress}
      disabled={disabled || isLoading}>
      {!isLoading ? (
        <>
          {icon}
          <Text
            color={color || colors.primary}
            style={{
              fontSize: fontSize.md,
              padding: 10,
              paddingBottom: 3,
              ...textStyle,
            }}>
            {text}
          </Text>
        </>
      ) : (
        <ActivityIndicator animating={isLoading} size="small" />
      )}
    </OutlineView>
  );
};

export const NewButton: React.FC<NewButtonProps> = ({
  title,
  onPress,
  style,
  fontSize,
  titleElement,
  disabled = false,
  loading = false,
}) => (
  <Btn
    title={
      titleElement || (
        <BoldText fontSize={fontSize || 16} color="#FFF">
          {title}
        </BoldText>
      )
    }
    containerStyle={[styles.buttonContainer, style]}
    buttonStyle={styles.button}
    onPress={onPress}
    disabled={disabled}
    loading={loading}
  />
);

export const OutlineButton: React.FC<NewButtonProps> = ({
  title,
  onPress,
  style,
  fontSize,
  disabled = false,
  loading = false,
  color
}) => (
  <Btn
    title={
      <BoldText fontSize={fontSize || 16} color={color} textAlign='center'>
        {title}
      </BoldText>
    }
    containerStyle={[styles.buttonContainer, , style]}
    buttonStyle={styles.button2}
    onPress={onPress}
    disabled={disabled}
    loading={loading}
  />
);
