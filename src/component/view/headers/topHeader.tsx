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
import { RFFontSize, SemiBoldText } from '../../../utils/text';

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
  rightText:string
  onPress:()=>void
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
  rightText,
  onPress,
}) => {
  const {colors} = useTheme();
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer
      style={{
        paddingTop: insets.top + (Platform.OS === 'ios' ? 12 : 25),
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
        {rightComponent ? (
          <>
            <TouchableOpacity onPress={onPress}>
            <SemiBoldText fontSize={RFFontSize.sm + 2} color={colors.mainColor}>
             {rightText}
            </SemiBoldText>
            </TouchableOpacity>
          </>
        ) : (
          // <AntDesign name={'arrowleft'} color={'transparent'} size={24} />
          <></>
        )}
      </HeaderSideComponent>
    </HeaderContainer>
  );
};
