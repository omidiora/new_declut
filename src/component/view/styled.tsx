import styled from '@emotion/native';
// import {LinearGradient} from 'expo-linear-gradient';
import {Animated, ColorValue, Platform, ViewStyle} from 'react-native';
import { heightPixel, widthPixel } from '../../utils/theme/pxToDpConvert';
import { wp } from '../../utils/general';
// import {wp} from '../../utility/general';
// import {heightPixel, widthPixel} from '../../utility/pxToDpConvert';
// import {EdgeInsets} from 'react-native-safe-area-context';
// import {RFValue} from 'react-native-responsive-fontsize';

export interface StyledRowProp {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  flexGrow?: ViewStyle['flexGrow'];
  flexDirection?: ViewStyle['flexDirection'];
  flex?: ViewStyle['flex'];
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: ColorValue;
  marginTop?: number;
}
export const Row = styled.TouchableOpacity<StyledRowProp>(
  ({
    justifyContent,
    alignItems,
    flexGrow,
    flexDirection = 'row',
    flex,
    paddingVertical = 0,
    paddingHorizontal = 0,
    backgroundColor,
    marginTop = 0,
  }) => ({
    flex,
    flexDirection,
    position: 'relative',
    justifyContent,
    alignItems,
    flexGrow,
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
    marginTop,
  }),
);

export interface ViewContainerProps {
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: ColorValue;
}

export const ViewContainer = styled(Animated.View)<ViewContainerProps>(
  ({paddingVertical = 0, paddingHorizontal = 20, backgroundColor}) => ({
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
  }),
);

// export const ActionSheetViewContainer = styled.View({
//   paddingHorizontal: 20,
//   paddingTop: RFValue(25),
//   paddingBottom: Platform.OS === 'android' ? RFValue(30) : 0,
// });

export const BaseViewContainer = styled.KeyboardAvoidingView<{
  backgroundColor?: string | ColorValue;
}>(({backgroundColor}) => ({
  backgroundColor,
  flex: 1,
}));

export const CenterViewContainer = styled.KeyboardAvoidingView<{
  backgroundColor?: string;
}>(({backgroundColor}) => ({
  backgroundColor,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));


export const Spacer = styled.View<{height?: number}>(({height}) => ({
  height: heightPixel(height ?? 20),
}));

export const HSpacer = styled.View<{width?: number}>(({width}) => ({
  width: widthPixel(width ?? 20),
}));


export const BottomContainer = styled(ViewContainer)<{
  relative?: boolean;
  display?: boolean;
  top:string
  backgroundColor?: ColorValue;
}>(({ relative, display = true, backgroundColor , }) => ({
  paddingTop: 10,
  paddingBottom: Platform.OS === 'android' ? 20 : 35,
  bottom: 0,
  position: relative ? 'relative' : 'absolute',
  display: display ? 'flex' : 'none',
  width: wp('100'),
  backgroundColor,
  
}));

// export const BaseLGView = styled(LinearGradient)({
//   flex: 1,
// });

// export const RoundedActionSheet = {
//   borderTopLeftRadius: widthPixel(30),
//   borderTopRightRadius: widthPixel(30),
// };

// export const Divider = styled.View<{
//   height?: number;
//   backgroundColor?: ColorValue | string;
// }>(({height = 20, backgroundColor = 'rgba(196, 196, 196, 0.37)'}) => ({
//   height,
//   backgroundColor,
// }));



// export const BottomContainer = styled(ViewContainer)<{
//   relative?: boolean;
//   display?: boolean;
//   backgroundColor?: ColorValue;
// }>(({relative, display = true, backgroundColor}) => ({
//   paddingTop: 10,
//   paddingBottom: Platform.OS === 'android' ? 40 : 35,
//   bottom: 0,
//   position: relative ? 'relative' : 'absolute',
//   display: display ? 'flex' : 'none',
//   width: wp('100'),
//   backgroundColor,
// }));

// export const Separator = styled.View({
//   backgroundColor: '#D2D1D7',
//   height: 1,
// });

// export const BottomViewContainer = BottomContainer;
