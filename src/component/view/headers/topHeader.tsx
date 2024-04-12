import {useTheme} from '@emotion/react';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderContainer, HeaderSideComponent, HeaderTitle} from '.';
import BackIcon from '../../../assets/images/backicon.svg';

export const TopHeader: React.FC<{
  title?: string;
  floating?: boolean;
  leftComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
  centerComponent?: React.ReactElement;
  containerStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  backButtonProp?: React.ReactElement;
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
  const {colors} = useTheme();
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();
  

  return (
    <HeaderContainer
      style={{
        paddingTop: insets.top + (Platform.OS === 'ios' ? 12 : 22),
        ...containerStyle,
      }}
      float={floating}
      borderBottom={borderBottom}>
      <HeaderSideComponent>
        {leftComponent ?? (
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon />
          </TouchableOpacity>
        )}
      </HeaderSideComponent>
      {centerComponent ?? (
        <HeaderTitle color={'black'} style={titleTextStyle}>
          {title}
        </HeaderTitle>
      )}
      <HeaderSideComponent style={{alignItems: 'flex-end'}}>
        {/* <Text>adfadknk</Text> */}
        {rightComponent ?? (
          // <AntDesign name={'arrowleft'} color={'transparent'} size={24} />
          <></>
        )}
      </HeaderSideComponent>
    </HeaderContainer>
  );
};
