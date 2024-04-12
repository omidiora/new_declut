import { useTheme } from '@emotion/react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HeaderContainerNew, HeaderSideComponent,
  HeaderTitle
} from '.';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import styled from '@emotion/native';
const Headed = styled.View({
  // width: '100%'
});
export const TopHeaderVariant: React.FC<{
  title?: string;
  floating?: boolean;
  leftComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
  centerComponent?: React.ReactElement;
  containerStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  backButtonProp?: Icon<'arrowleft', "anticon"> | any;
  borderBottom?: boolean;
}> = ({
  title,
  leftComponent,
  rightComponent,
  centerComponent,
  containerStyle,
  titleTextStyle,
  floating,
  backButtonProp,
  borderBottom,
}) => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainerNew
      style={{
        paddingTop: insets.top + (Platform.OS === 'ios' ? 32 : 32),
        ...containerStyle
      }}
      float={floating}
      borderBottom={borderBottom}
    >
      <HeaderSideComponent>
        {leftComponent ?? (
          <Entypo
            onPress={goBack}
            name={'chevron-small-left'}
            color={colors.card}
            size={24}
            {...backButtonProp}
          />
        )}
      </HeaderSideComponent>
      
      {centerComponent ?? (
        <HeaderTitle color={colors.text} style={titleTextStyle}>
          {title}
        </HeaderTitle>
      )}
   
      <HeaderSideComponent style={{ alignItems: 'flex-end' }}>
        {rightComponent ?? (
          <AntDesign name={'arrowleft'} color={'transparent'} size={24} />
        )}
      </HeaderSideComponent>
    </HeaderContainerNew>
  );
};
