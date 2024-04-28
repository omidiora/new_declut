import React, {ReactElement, useCallback, useRef, useState} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {Dimensions} from 'react-native';

import LogoSvg from '../../assets/Onboarding/img1.svg';
import One from '../../assets/Onboarding/img1.svg';
import Two from '../../assets/Onboarding/img2.svg';
import Three from '../../assets/Onboarding/img3.svg';
import Four from '../../assets/Onboarding/img1.svg';
import {heightPixel, widthPixel} from '../../utils/theme/pxToDpConvert';
import {hp, wp} from '../../utils/general';
import {ViewContainer, Spacer} from '../../component/view';
import {BoldText, MediumText, TextSizes, lineHeight} from '../../utils/text';
import {SIZES} from '../../utils/theme/theme';
import { HP } from '../../old/Util/Util';

const {width, height} = Dimensions.get('window');

const Wrapper = styled.View({
  flexDirection: 'column',
  width,
  height: hp(140),
});

const FlatList = styled.FlatList({
  width,
  height,
});

const Image = styled.Image({
  width,
  height: hp(29),
});

const Page = styled.View({
  flexDirection: 'column',
  alignItems: 'center',
  width,
});

const Middle = styled.View({
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  top: heightPixel(670),
  zIndex: 1000,
});

const Header = styled(BoldText)<{color?: string}>(
  {
    fontSize: TextSizes.lg,
    lineHeight: TextSizes.lg + 6,
    marginBottom: 6,
  },
  props => ({
    color: props.color,
  }),
);

const SubText = styled(MediumText)(
  {
    textAlign: 'center',
    width: wp(90),
    fontSize: TextSizes.md-2,
    lineHeight: lineHeight.lg,
  },
  props => ({
    color: props.color,
  }),
);

const View = styled.View({
  width,
  alignItems: 'center',
  flexDirection: 'column',
  position: 'absolute',
  top: hp(56),
  paddingTop: 40,
});

const ImageView = styled.Image({
  width: SIZES.width / 1.2,
  height: SIZES.height / 2,
  resizeMode: 'contain',
});
const IndicatorWrapper = styled.View({
  width,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop:HP(-51)
  // position:'absolute',

  // left:30,
  // bottom:215
  // marginTop:7
});

const Indicator = styled.View<{active: boolean}>(
  {
    height: widthPixel(9),
    borderRadius: widthPixel(50),
    marginHorizontal: widthPixel(4),
  },
  props => ({
    backgroundColor: props?.active ? '#02A89E' : '#c4c4c4',
    width: props.active ? wp(4.5) : wp(2),
  }),
);

type OnboardingSlide = {
  title: string;
  subTitle: string;
  image: ReactElement;
};

const slides: OnboardingSlide[] = [
  {
    title: 'Welcome to Declut',
    subTitle:
      'Our platform connects buyers and sellers for seamless household item transactions. Post your items for sale, shop for quality goods, and schedule inspections effortlessly. Join us today and turn your household items into treasures!.',
    image: require('../../assets/images/Onboarding/img1.png'),
  },
  {
    title: 'Discover & Sell with Declut',
    subTitle:
      "Unleash the potential of your unused household items! List them for sale on our platform and find eager buyers. From furniture to electronics, we've got you covered. Get started and watch your items find new homes.",
    image: require('../../assets/images/Onboarding/img3.png'),
  },
  {
    title: 'Easy Buying & Inspections',
    subTitle:
      'Explore a world of household treasures on "Declut" Buy with confidence, knowing you can schedule inspections before making a decision. Finding your perfect piece has never been easier. Join now and indulge in smart buying experiences!',
    image: require('../../assets/images/Onboarding/img2.png'),
  },
];

const Background: React.FC = () => {
  const {colors} = useTheme();

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onSlide = useCallback(event => {
    if (event && event.nativeEvent) {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      const distance = Math.abs(roundIndex - index);
      const isNoMansLand = 0.4 < distance;

      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
      }
    }
  }, []);

  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      // Calculate the next index based on the current index and the number of slides
      const newIndex = (index + 1) % 1;
      console.log((index + 2) % 3, 'index');
      onSlide(newIndex);
    }, 5000); // Auto-slide every 5 seconds
    return () => {
      clearInterval(slideInterval); // Clean up the interval on component unmount
    };
  }, [index]);

  const renderItem = ({item}: any) => (
    <Page>
      <ImageView
        source={item.image}
        resizeMethod="resize"
        // source={item.image}
      />
       
      <View style={{marginTop: SIZES.height / -13}}>
      <Spacer height={16}/>
        <Header color={colors.primaryBlack}>{item.title}</Header>
        <Spacer height={12}/>
        <SubText color={colors.secondaryBlack}>{item.subTitle}</SubText>
      </View>
    </Page>
  );

  return (
    <Wrapper>
      <Middle>
        <IndicatorWrapper>
          <Indicator active={index === 0} />
          <Indicator active={index === 1} />
          <Indicator active={index === 2} />
        </IndicatorWrapper>
      </Middle>
      <FlatList
        keyExtractor={(_, index) => `${index}`}
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onSlide}
      />
    </Wrapper>
  );
};

export default Background;
