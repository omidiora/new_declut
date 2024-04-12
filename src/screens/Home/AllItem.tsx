import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BoldText, RegularText, SemiBoldText, fontSize} from '../../utils/text';
import {heightPixel, widthPixel} from '../../utils/theme/pxToDpConvert';
import styled from '@emotion/native';
import {Container} from './component';
import {LinkView} from './component/LinkView';

// import {Container} from './component';
// import {LinkView} from './component/LinkView';
import Electronic from '../../assets/images/category/Electronic.svg';
import Funiture from '../../assets/images/category/fun.svg';
import Sport from '../../assets/images/category/sport.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {SIZES} from '../../utils/theme/theme';
import Setting from '../../assets/images/setting.svg';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useGetInterestMutation} from '../../../redux/product/new_api';
import {fetchApiData} from '../../../redux/product/api';
import {useAppSelector} from '../../../redux/hook';
import FastImage from 'react-native-fast-image';
import {NAIRA_SYSMBOL, hp, wp} from '../../utils/general';
import Location from '../../assets/images/location.svg';
const LinksViewContainer = styled(Container)({
  marginTop: heightPixel(40),
  marginBottom: heightPixel(30),
  //   marginHorizontal: widthPixel(1),
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

const LineComponent = styled.View({
  backgroundColor: '#667085',
  height: 0.28,
  width: SIZES.width,
  alignSelf: 'center',
  opacity: 0.2,
});

const LocationIcon = styled(Location)({
  marginTop: 1,
  // paddingHorizontal:10,
  right: 3,
});

const ItemCondition = styled.View({
  position: 'absolute',
  zIndex: 300,
  marginLeft: wp(20),
  backgroundColor: 'black',
  padding: 3,
  borderRadius: wp(3),
  marginTop: hp(1),
  width: wp(21),
});

const AllItem = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [getInterest] = useGetInterestMutation();
  const {data, loading, error, category, customLocationData} = useAppSelector(
    state => state.product,
  );

  React.useEffect(() => {
    dispatch(fetchApiData());
  }, []);


  console.log(error)

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ViewContainer>
          <Spacer height={30} />
          <Row
            disabled={true}
            flexDirection="row"
            justifyContent="space-between">
            <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
              Categories
            </BoldText>
            <TouchableOpacity>
              <SemiBoldText color={colors.mainColor} fontSize={fontSize.md}>
                See All
              </SemiBoldText>
            </TouchableOpacity>
          </Row>

          <LinksViewContainer insets={0}>
            <LinkView
              image={<Electronic width={RFValue(28)} height={RFValue(28)} />}
              text={'Electronic'}
              onPress={() => {}}
              textColor={colors.primary}
            />
            <LinkView
              image={<Funiture width={RFValue(28)} height={RFValue(28)} />}
              text={'Furniture'}
              onPress={() => {}}
              textColor={colors.primary}
            />
            <LinkView
              image={<Sport width={RFValue(28)} height={RFValue(28)} />}
              text={'Sports & Outdoor'}
              onPress={() => {}}
              textColor={colors.primary}
            />
            <LinkView
              image={<Sport width={RFValue(28)} height={RFValue(28)} />}
              text={'Toys & Games'}
              onPress={() => {}}
              textColor={colors.primary}
            />
          </LinksViewContainer>
          <Spacer height={5} />
          <LineComponent />
          <Spacer height={50} />
          <Row
            disabled={true}
            flexDirection="row"
            justifyContent="space-between">
            <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
              Listing
            </BoldText>
            <TouchableOpacity>
              <Setting />
            </TouchableOpacity>
          </Row>
          <Spacer height={25} />
          <FlatList
            contentContainerStyle={{
              flex: 1,
              alignSelf: 'center',
              // paddingVertical: 20,
              // paddingHorizontal: 15,
            }}
            // columnWrapperStyle={{width: '50%'}}
            numColumns={2}
            horizontal={false}
            data={
              typeof data?.data?.data == 'object'
                ? Object.values(data?.data?.data)
                : data?.data?.data
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <TouchableOpacity style={{marginBottom: 50}}>
                  <FastImage
                    style={{
                      width: SIZES.width / 2.3,
                      height: 150,
                      //
                      marginHorizontal: 5,
                      borderRadius: 12,

                      // Make the image round
                    }}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',

                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Spacer />
                  <ItemCondition>
                    <SemiBoldText color={'white'} textAlign="center">
                      {item?.item_condition}
                    </SemiBoldText>
                  </ItemCondition>

                  <View style={{left: 10}}>
                    <HSpacer />
                    <BoldText
                      color={colors.mediumGrey}
                      fontSize={14}
                      lineHeight={21}>
                      {item.item_name}
                    </BoldText>
                    <Spacer height={5} />
                    <BoldText
                      color={colors.darkBlack}
                      fontSize={14}
                      lineHeight={21}>
                      {NAIRA_SYSMBOL}
                      {item.price}
                    </BoldText>
                    <Spacer height={7} />
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <LocationIcon />
                      </View>
                      <BoldText fontSize={14} color={colors.mediumGrey}>
                        {item.area} {item.state}
                      </BoldText>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            ListEmptyComponent={() => (
              <>
                {/* {loading ? (
                  <View style={styles.empty}>
                    <PostLoader
                      barStyle={'dark-content'} //---> StatusBar Icon color
                      animSpeed={100} //----> Animation Speed default 100
                      visible={true} //----> Visibility
                      backgroundColor={'white'}
                    />
                  </View>
                ) : (
                  <Text style={styles.noItem}>
                    No item in your location yet !{' '}
                  </Text>
                )} */}
              </>
            )}
          />
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

export default AllItem;

const styles = StyleSheet.create({});
