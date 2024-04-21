import {useTheme} from '@emotion/react';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  HeaderContainer,
  HeaderSideComponent,
  HeaderTitle,
  NewBorderContainer,
} from '.';
import BackIcon from '../../../assets/images/backicon.svg';
import {RFFontSize, SemiBoldText} from '../../../utils/text';

export const AddItemHeader: React.FC<{
  title?: string;
  floating?: boolean;
  leftComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
  centerComponent?: React.ReactElement;
  containerStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  backButtonProp?: React.ReactElement;
  borderBottom?: boolean;
  rightText: string;
  onPress: () => void;
  borderBottom1:string;
  borderBottom2:string;
  borderBottom3:string;
  borderBottom4:string;
}> = ({
  title,
  leftComponent,
  rightComponent,
  centerComponent,
  containerStyle,
  titleTextStyle,
  floating,
  backButtonProp,
  borderBottom1,
  borderBottom2,
  borderBottom3,
  borderBottom4,
  rightText,
  onPress,
}) => {
  const {colors} = useTheme();
  const {goBack} = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <HeaderContainer
        style={{
          paddingTop: insets.top + (Platform.OS === 'ios' ? 12 : 25),
          ...containerStyle,
        }}
        float={floating}
        borderBottom={true}>
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
                <SemiBoldText
                  fontSize={RFFontSize.sm + 2}
                  color={colors.mainColor}>
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
      <View style={{flexDirection: 'row' }}>
        {borderBottom1 && <NewBorderContainer />}
        {borderBottom2 && <NewBorderContainer style={{marginLeft: 80}} />}
        {borderBottom3 && <NewBorderContainer style={{marginLeft: 175}} />}
        {borderBottom4 && <NewBorderContainer style={{marginLeft: 260}} />}
      </View>
    </>
  );
};

//
