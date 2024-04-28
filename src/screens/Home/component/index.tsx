import styled from '@emotion/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {EdgeInsets} from 'react-native-safe-area-context';

import {ViewContainer} from '../../../component/view';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../utils/theme/pxToDpConvert';
import {font} from '../../../utils/theme/fonts';
import {wp} from '../../../utils/general';
import {SemiBoldText, MediumText, RegularText} from '../../../utils/text';
import { SIZES } from '../../../utils/theme/theme';
// import { ViewContainer } from '../../../../components/view';
// import { font } from '../../../../utility/fonts';
// import { wp } from '../../../../utility/general';
// import { fontPixel, heightPixel, widthPixel } from '../../../../utility/pxToDpConvert';
// import BalanceCard from '../../../market/balanceCard';

/**carosel============= */
export const ScrollIndicatorContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: heightPixel(26),
});

export const FlatList = styled.FlatList({});

export const Seperator = styled.View({
  marginRight: widthPixel(20),
});

export const ScrollIndicator = styled.View<{
  backgroundColor: string;
  size: number;
}>(({backgroundColor, size}) => ({
  backgroundColor,
  width: fontPixel(size),
  height: fontPixel(size),
  marginHorizontal: widthPixel(2),
  borderRadius: heightPixel(4),
}));

/**Finance home */
export type ViewProps = {
  backgroundColor?: string;
  insets: EdgeInsets;
};
export const Container = styled.SafeAreaView<ViewProps>(
  ({backgroundColor, insets}) => ({
    flex: 1,
    paddingTop: insets.top,
    backgroundColor,
  }),
);
export const ScrollView = styled.ScrollView({});

export const Header = styled.View({
  marginTop: heightPixel(30.74),
  marginBottom: heightPixel(20),
  marginHorizontal: widthPixel(20),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Title = styled.Text<{
  color: string;
}>(({color}) => ({
  color,
  fontSize: fontPixel(14),
  fontFamily: font.semiBold,
}));

export const View = styled.View({});

export const TitleContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
});

export const TitleImage = styled.Image({
  height: fontPixel(22),
  width: fontPixel(22),
  resizeMode: 'contain',
});

export const LinkImageContainer = styled.View({
  height: fontPixel(55),
  width: fontPixel(55),
  borderRadius: fontPixel(50),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(106, 35, 129, 0.05)',
  marginBottom: heightPixel(10),
});

export const TitleImageContiner = styled(LinkImageContainer)({
  height: fontPixel(32),
  width: fontPixel(32),
  borderRadius: fontPixel(16),
  marginRight: widthPixel(7),
  backgroundColor: 'rgba(73, 24, 89, 0.07)',
});

export const BaseView = styled.View<{
  backgroundColor: string;
  marginTop?: number;
}>(({backgroundColor, marginTop}) => ({
  backgroundColor,
  marginTop,
}));

export const ProgressContainer = styled.TouchableOpacity({
  marginHorizontal: widthPixel(21),
  paddingVertical: heightPixel(20),
  paddingHorizontal: widthPixel(20),
  borderRadius: heightPixel(20),
  marginBottom: heightPixel(27),
  marginTop: heightPixel(20),
  alignItems: 'center',
  backgroundColor: '#F9FAFC',
  flexDirection: 'row',
});

export const SectionContainer = styled(ViewContainer)({
  paddingBottom: 25,
  paddingTop: 20,
});

export const OfferCard = styled(SectionContainer)({
  marginBottom: heightPixel(0),
});

export const OfferCardTextContainer = styled.View({
  minHeight: heightPixel(161),
  width: '100%',
  position: 'absolute',
  paddingRight: 18,
  justifyContent: 'center',
  alignItems: 'flex-end',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const TransationContainer = styled(BaseView)({
  marginTop: heightPixel(10),
  marginBottom: heightPixel(20),
  paddingBottom: heightPixel(25),
});

export const MainContainer = styled(BaseView)({
  borderBottomLeftRadius: fontPixel(50),
  borderBottomRightRadius: fontPixel(50),
});

export const EmptyView = styled.View({
  marginTop: heightPixel(40),
  marginBottom: heightPixel(27),
  justifyContent: 'center',
  alignItems: 'center',
});

export const KYCTitle = styled(SemiBoldText)({
  fontSize: fontPixel(12),
  lineHeight: fontPixel(14.63),
});

export const KYCSubTitle = styled(MediumText)({
  fontSize: fontPixel(12),
  lineHeight: fontPixel(14.63),
});

export const LoanOptionContainer = styled.View({
  flexDirection: 'row',
  marginTop: heightPixel(30),
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

export const LoanOption = styled.TouchableOpacity<{backgroundColor: string}>(
  ({backgroundColor}) => ({
    backgroundColor,
    paddingTop: heightPixel(17),
    paddingLeft: widthPixel(19),
    flex: 1,
    borderRadius: widthPixel(20),
    paddingBottom: heightPixel(47),
    maxWidth: wp(45),
  }),
);

export const LoanTitle = styled(SemiBoldText)({
  marginTop: heightPixel(21),
  marginBottom: heightPixel(8),
  fontSize: RFValue(13),
});

export const LoanSubTitle = styled(RegularText)({
  marginRight: widthPixel(13),
  lineHeight: 18,
  fontSize: RFValue(12),
});

export const LineComponent = styled.View({
  backgroundColor: '#667085',
  height: 0.28,
  width: SIZES.width/1.1,
  alignSelf: 'center',
  opacity: 1,
});
