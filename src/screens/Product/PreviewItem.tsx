import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import LeftIcon from '../../assets/images/left.svg';
import VerticalIcon from '../../assets/images/dots-vertical.svg';
import styled from '@emotion/native';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';
import {NAIRA_SYSMBOL, hp, wp} from '../../utils/general';
import {SIZES} from '../../utils/theme/theme';
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText,
  fontSize,
} from '../../utils/text';
import Location from '../../assets/images/location.svg';
import {LineComponent} from '../Home/component';
import {SecondaryButton} from '../../component/view/button';
import {useDispatch} from 'react-redux';
import {orderPaymentApi} from '../../../redux/payment/api';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ArrowIcon from '../../assets/images/arrow.svg';
import {font} from '../../utils/theme/fonts';
import ArrowBack from '../../assets/images/black_arrow_icon.svg';
import VideoPlayer from 'react-native-video';
const LocationContainer = styled.View({
  flexDirection: 'row',
});
const LocationIcon = styled(Location)({
  top: 1,
});

const DetailContainer = styled.View({
  bottom: SIZES.height / 13,
  // position:"absolute",
  // zIndex:300,
  // top:430
});

const ShowInterestButton = styled.TouchableOpacity({
  borderWidth: 1,
  paddingTop: hp(2),
  width: SIZES.width / 2,
  borderRadius: 30,
  borderColor: '#02A89E',
  backgroundColor: '#02A89E',
  marginTop: SIZES.height / 30,
  height: hp(6.5),
  // paddingBottom:20
});

const RowItemContainer = styled.View<{width: string}>(({width}) => ({
  width,
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const ActivityIndicatorIcon = styled(ActivityIndicator)({
  alignSelf: 'center',
  alignItems: 'center',
  left: 50,
  bottom: 4,
});
const NoteContainer = styled.View({
  marginTop: -50,
  backgroundColor: '#FEF0C7',
  padding: 15,
  borderRadius: 20,
  paddingBottom: 40,
});

const ReportText = styled.Text({
  color: '#101828',
  alignSelf: 'flex-end',
  textDecorationLine: 'underline',
  fontFamily: font.semiBold,
  // fonweight:"bold"
});
const PreviewItem = () => {
  const route = useRoute();
  const [activeIndex, setActiveIndex] = useState(0);
  const {width: screenWidth} = Dimensions.get('window');
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setActiveIndex(newIndex);
  };

  const OrderItemFunc = () => {
    // setloading(true);
    dispatch(
      orderPaymentApi({
        payload: {
          id: route?.params?.item?.id,
          trx_ref: uuid.v4(),
          item_amount: route?.params?.item?.price,
        },

        navigation,
        setloading,
      }),
    );
    //
    // setloading(false);
  };

  const PaginationDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,
      }}>
      <View
        style={{
          width: screenWidth,
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: SIZES.height / 27,
        }}>
        {route?.params?.item?.item_media.map((_, index) => (
          <View
            key={index}
            style={{
              width: index === activeIndex ? 18 : 8,
              height: 8,
              borderRadius: 30,
              backgroundColor:
                index === activeIndex ? colors.mainColor : '#E0F7F6',
              marginHorizontal: 2,
            }}
          />
        ))}
      </View>
    </View>
  );

  console.log('====================================');
  console.log(route?.params?.item);
  console.log('====================================');
  return (
    <BaseView backgroundColor="#F9FAFB">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          zIndex: 100,
          backgroundColor: 'white',
          borderRadius: 40,
          padding: 2,
          width: 40,
          height: 40,
        }}>
        <View style={{alignSelf: 'center', marginTop: 11}}>
          <ArrowBack tintColor={'black'} />
        </View>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        showsVerticalScrollIndicator={false}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{flexGrow: 1}}
          onScroll={handleScroll}
          data={route.params?.item?.item_media}
          renderItem={({item}) => (
            <View>
              {item.filepath.endsWith('.mp4') && (
                <>
                  <View
                    style={{
                      width: screenWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <VideoPlayer
                      disableFocus={true}
                      muted={false}
                      // key={item?.media?.id}
                      source={{
                        uri: item.filepath,
                      }}
                      style={{width: wp(100), height: hp(30)}}
                      controls={false}
                      autoplay={false}
                      hideControlsOnStart={true}
                    />
                  </View>
                </>
              )}

              {!item.filepath.endsWith('.mp4') && (
                <View>
                  <View style={{width: screenWidth}}>
                    <ImageBackground
                      source={{uri: item.filepath}}
                      style={{width: screenWidth, height: wp(70)}}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />
        <PaginationDots />

        <View style={{flex: 2, marginTop: SIZES.height / 9}}>
          <ViewContainer>
            <DetailContainer>
              <SemiBoldText fontSize={fontSize.sm + 2} color={colors.orange}>
                Posted {route?.params?.item?.listed}
              </SemiBoldText>
              <Spacer height={5} />
              <BoldText fontSize={fontSize.xl} color={colors.darkBlack}>
                {route?.params?.item?.item_name}
              </BoldText>

              <Spacer height={5} />
              <LocationContainer>
                <View style={{marginTop: hp(0.12)}}>
                  <LocationIcon height={hp(2)} />
                </View>
                <HSpacer width={5} />
                <SemiBoldText
                  color={colors.mediumGrey}
                  fontSize={fontSize.sm + 2}>
                  {route?.params?.item?.area +
                    ', ' +
                    route?.params?.item?.state}
                </SemiBoldText>
              </LocationContainer>
              <Spacer height={20} />
              <LineComponent />
              <Spacer height={30} />
              <View>
                <SemiBoldText color={colors.darkBlack} fontSize={fontSize.md}>
                  Description
                </SemiBoldText>
                <Spacer height={5} />
                <RegularText
                  color="#344054"
                  lineHeight={22}
                  fontSize={fontSize.sm + 2}>
                  {route?.params?.item?.description}
                </RegularText>
              </View>

              <Spacer height={30} />
              <RowItemContainer width={90}>
                <BoldText
                  color={colors.secondaryBlack}
                  fontSize={fontSize.sm + 2}>
                  Brand:
                </BoldText>
                <HSpacer width={6} />
                <BoldText color={'#344054'} fontSize={fontSize.sm + 2}>
                  {route?.params?.item?.brand}
                </BoldText>
              </RowItemContainer>
              <Spacer height={30} />
              <RowItemContainer width={wp(35)}>
                <SemiBoldText
                  color={colors.darkBlack}
                  fontSize={fontSize.sm + 2}>
                  Item Condition:
                </SemiBoldText>
                <HSpacer width={7} />
                <SemiBoldText color={'#344054'} fontSize={fontSize.sm + 2}>
                  {route?.params?.item?.item_condition}
                </SemiBoldText>
              </RowItemContainer>
              <Spacer height={30} />
              <RowItemContainer width={90}>
                <SemiBoldText
                  color={colors.darkBlack}
                  fontSize={fontSize.sm + 2}>
                  Defect:
                </SemiBoldText>
                <HSpacer width={6} />
                {/* check if it null */}
                {route?.params?.item?.defect_reason == 'null' && (
                  <SemiBoldText
                    color={colors.secondaryBlack}
                    fontSize={fontSize.sm + 2}>
                    {route?.params?.item?.defect_reason}
                  </SemiBoldText>
                )}
              </RowItemContainer>
              {route?.params?.item?.defect_reason !== 'null' && (
                <RegularText
                  color={colors.darkBlack}
                  fontSize={fontSize.sm + 2}>
                  {route?.params?.item?.defect_reason}
                </RegularText>
              )}
            </DetailContainer>

            <Spacer />
            <NoteContainer>
              <RegularText lineHeight={23} fontSize={14} color="#344054">
                Please note that we will never initiate the first contact with
                you to ensure your safety from potential scammers. {'\n'}
                {'\n'}
                If this item aligns with your requirements, kindly click on
                'Show Interest' to proceed.{'\n'}
                {'\n'} Please be aware that you are responsible for the delivery
                costs. Before expressing your interest, kindly verify the item's
                location.{'\n'}
                {'\n'} The order will be confirmed upon successful payment,
                ensuring a seamless transaction process.{'\n'}
                {'\n'} Upon payment confirmation, you will receive the seller's
                details to facilitate item pickup.{'\n'}
                {'\n'} Kindly note that item pick-up should be arranged within a
                48-hour timeframe. Refunds due to change of heart, distance and
                logistical considerations are subject to a 10% service charge.
                {'\n'}
                {'\n'} Before proceeding with your payment, please ensure that
                you can conveniently access the pick-up location within the
                specified time. {'\n'}
                {'\n'}Please be informed that refunds will be processed once all
                terms and conditions have been met.{'\n'}
                {'\n'} Thank you for your understanding and cooperation.
                {'\n'}
              </RegularText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReportItem', {item: route?.params})
                }>
                <ReportText>Report Item</ReportText>
              </TouchableOpacity>
            </NoteContainer>
          </ViewContainer>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1.5,
          backgroundColor: 'white',
          height: 10,
          borderTopWidth: 1,
          borderColor: '#D0D5DD',
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          marginTop: hp(-20),
        }}>
        <ViewContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Spacer height={40} />
              <SemiBoldText fontSize={fontSize.sm} color="#667085">
                {'Total Price'}
              </SemiBoldText>

              <SemiBoldText fontSize={fontSize.lg} color={colors.darkBlack}>
                {NAIRA_SYSMBOL}
                {route.params?.item?.price}
              </SemiBoldText>
            </View>
            <ShowInterestButton
              onPress={() => OrderItemFunc()}
              disabled={loading}>
              <Row paddingHorizontal={40} disabled={true}>
                {loading ? (
                  <ActivityIndicatorIcon color={'white'} size={'large'} />
                ) : (
                  <>
                    <SemiBoldText
                      textAlign="center"
                      color="white"
                      fontSize={fontSize.sm + 2}>
                      Show Interest
                    </SemiBoldText>
                    <View style={{marginTop: hp(0.5), left: 5}}>
                      <ArrowIcon />
                    </View>
                  </>
                )}
              </Row>
            </ShowInterestButton>
          </View>
        </ViewContainer>
      </View>
    </BaseView>
  );
};

export default PreviewItem;

const styles = StyleSheet.create({});
