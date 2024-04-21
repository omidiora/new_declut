import styled from '@emotion/native';
import {Platform} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel} from '../../../utils/theme/pxToDpConvert';
import {RFFontSize, BoldText, RFLineHeight} from '../../../utils/text';
import BackIcon from '../../../assets/images/backicon.svg';

export const HeaderContainer = styled.View<{
  float?: boolean;
  borderBottom?: boolean;
}>(({float, borderBottom}) => ({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: heightPixel(8),
  // paddingTop: (Platform.OS === 'ios') ? (float ? hp('6%') : hp('5.5%')) : hp('2.5%'),
  backgroundColor: float ? '#fff' : 'transparent',
  paddingHorizontal: 20,
  position: float ? 'absolute' : 'relative',
  zIndex: float ? 100 : 0,
  borderBottomColor: borderBottom ? '#D2D1D7' : 'transparent',
  borderBottomWidth: 6,
  right: 5,
}));
export const HeaderContainerNew = styled.View<{
  float?: boolean;
  borderBottom?: boolean;
}>(({float, borderBottom}) => ({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  // alignItems: 'center',
  paddingBottom: heightPixel(8),
  // paddingTop: (Platform.OS === 'ios') ? (float ? hp('6%') : hp('5.5%')) : hp('2.5%'),
  backgroundColor: float ? '#fff' : 'transparent',
  paddingHorizontal: 20,
  position: float ? 'absolute' : 'relative',
  zIndex: float ? 100 : 0,
  borderBottomColor: borderBottom ? '#D2D1D7' : 'transparent',
  borderBottomWidth: 0.9,
  borderBottomEndRadius: 20,
  borderBottomStartRadius: 20,
}));

export const HeaderTitle = styled(BoldText)({
  fontSize: RFFontSize.md + 2,
  lineHeight: RFLineHeight.sm + 2,
  textAlign: 'center',
  flex: 2,
  paddingTop: 5,
});

export const HeaderIcon = styled.View({
  zIndex: 3,
  justifyContent: 'center',
});

export const HeaderSideComponent = styled.View({
  flex: 1,
  bottom: 2,
});

export const NewBorderContainer = styled.View({
  height: 5,
  backgroundColor: '#02A89E',
  width: '27%',
  position: 'absolute',
  zIndex: 300,
  bottom: 0,
});
