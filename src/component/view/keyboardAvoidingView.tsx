import styled from '@emotion/native';
import React, { ReactNode } from 'react';
import { Platform, StatusBar, StatusBarStyle } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { heightPixel } from '../utility/pxToDpConvert';
import { Type } from '../screens/notification';

const KeyboardAvoidingView = styled.KeyboardAvoidingView({
  flex: 1
});

const View = styled.View({
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: "white"
});

type CustomKeyboardAvoidingViewProps ={
  verticalOffset?: number,
  focusBarStyle?: StatusBarStyle
  children?: ReactNode
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({
  verticalOffset =  10,
  focusBarStyle = "dark-content",
  children 
}) => {
  const height = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
      keyboardVerticalOffset={verticalOffset}
      enabled={true}
    >
      <StatusBar barStyle={focusBarStyle} />
      <View>{children}</View>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;
