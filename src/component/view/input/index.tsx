import React, { useState } from 'react';
import styled from '@emotion/native';
import {
  Keyboard,
  PressableProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { TextInput as Base } from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { RegularText } from '../../../utils/text';
import { heightPixel,  widthPixel } from '../../../utils/theme/pxToDpConvert';
import { font } from '../../../utils/theme/fonts';

const paddingHorizontal = wp(3.5);
const borderRadius = widthPixel(20);

interface IProps {
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export const Input = styled(Base)({
  fontFamily: font.regular,
  fontSize: RFValue(12),
  flex: 8,
  height: 50,
  backgroundColor: 'transparent'
});

export const InputWrapper = styled.View<IProps>((props) => ({
  borderColor: props.borderColor,
  backgroundColor: props.backgroundColor,
  borderWidth: 0.4,
  borderRadius: props?.borderRadius ?? 5,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal
}));

const IconWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: wp(2)
});

const Image = styled.Image({
  width: wp(4),
  height: wp(3),
  resizeMode: 'cover'
});

const Text = styled.Text({
  marginLeft: wp(2),
  fontFamily: font.regular,
  fontSize: wp(3)
});

export const BottomText = styled(RegularText)({
  paddingLeft: widthPixel(15),
  paddingTop: heightPixel(2)
});

export interface InputProps extends TextInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  bottomText?: string;
  error?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextInput: React.FC<InputProps> = ({
  keyboardType,
  style,
  leftIcon,
  rightIcon,
  editable = true,
  bottomText,
  error,
  containerStyle,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(Boolean(rest.value));
  const { colors } = useTheme();

  return (
    <>

   
      <InputWrapper
        borderColor={
          active || !Boolean(editable) ? colors.primary : colors.border
        }
        backgroundColor={
          active || !Boolean(editable) ? colors.background : colors.card
        }
        style={containerStyle}
      
      >
        {leftIcon}
        <Input
          style={style}
          editable={editable}
          {...rest}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholderTextColor="#828282"
        />
        {rightIcon}
      </InputWrapper>
      {bottomText ? (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginTop: 6 }}
            name="circle"
            size={10}
            color="#FFA200"
            tvParallaxProperties={undefined}
          />
          <BottomText color={error ? colors.notification : colors.text}>
            {bottomText}
          </BottomText>
        </View>
      ) : null}
    </>
  );
};

