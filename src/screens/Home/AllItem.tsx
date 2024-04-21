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
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
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
import {FloatingAction} from 'react-native-floating-action';
import {PostLoader} from 'react-native-preloader-shimmer';
import ModalSeeAllComponent from './component/ModalSeeAllComponent';

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

const AllItem = ({onScroll}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [getInterest] = useGetInterestMutation();
  const {data, loading, error, category, customLocationData} = useAppSelector(
    state => state.product,
  );

  React.useEffect(() => {
    dispatch(fetchApiData());
  }, []);

  const NavigateCategoryProduct = (id, title) => {
    navigation.navigate('CategoryPage', {
      categoryId: id,
      categoryTitle: title,
    });
  };



  return (
    <BaseView backgroundColor={colors.bgColor}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}  onScroll={onScroll}>
        <ViewContainer>
          <Spacer height={30} />
          <Row
            disabled={true}
            flexDirection="row"
            justifyContent="space-between">
            <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
              Categories
            </BoldText>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <SemiBoldText color={colors.mainColor} fontSize={fontSize.md}>
                See All
              </SemiBoldText>
            </TouchableOpacity>
          </Row>

          <LinksViewContainer insets={0}>
            <LinkView
              image={<Electronic width={RFValue(28)} height={RFValue(28)} />}
              text={'Electronics'}
              onPress={() => NavigateCategoryProduct(1, 'Electronics')}
              textColor={colors.primary}
            />
            <LinkView
              image={<Funiture width={RFValue(28)} height={RFValue(28)} />}
              text={'Furniture'}
              onPress={() => NavigateCategoryProduct(2, 'Furniture')}
              textColor={colors.primary}
            />
            <LinkView
              image={<Sport width={RFValue(28)} height={RFValue(28)} />}
              text={'Sports & Outdoor'}
              onPress={() => NavigateCategoryProduct(3, 'Clothing')}
              textColor={colors.primary}
            />
            <LinkView
              image={<Sport width={RFValue(28)} height={RFValue(28)} />}
              text={'Toys & Games'}
              onPress={() => NavigateCategoryProduct(4, 'Toys & Games')}
            />
          </LinksViewContainer>
          <Spacer height={15} />
          <LineComponent />
          <Spacer height={24} />
          <Row
            disabled={true}
            flexDirection="row"
            justifyContent="space-between">
            <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
              Listing
            </BoldText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Setting', {
                  screen: 'GeneralSetting',
                })
              }>
              <Setting />
            </TouchableOpacity>
          </Row>
          <Spacer height={25} />
          <FlatList
            contentContainerStyle={{
              flex: 1,
              alignSelf: 'center',
              paddingBottom: 30,
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
                <TouchableOpacity
                  style={{marginBottom: 50}}
                  onPress={() => navigation.navigate('PreviewItem', {item})}>
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
                      uri: item.item_media?.[0]?.filepath,

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
                      <SemiBoldText fontSize={14} color={colors.mediumGrey}>
                        {item.area} {item.state}
                      </SemiBoldText>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            ListEmptyComponent={() => (
              <>
                {loading ? (
                  <View style={styles.empty}>
                    <PostLoader
                      barStyle={'dark-content'} //---> StatusBar Icon color
                      animSpeed={100} //----> Animation Speed default 100
                      visible={true} //----> Visibility
                      backgroundColor={'white'}
                    />
                  </View>
                ) : (
                  <>
                    <Spacer />
                    <SemiBoldText
                      fontSize={14}
                      color={colors.secondaryBlack}
                      style={styles.noItem}>
                      No item in your location yet !
                    </SemiBoldText>
                  </>
                )}
              </>
            )}
          />

          <ModalSeeAllComponent
            visible={isModalVisible}
            setModalVisible={setModalVisible}
          />
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

export default AllItem;

const styles = StyleSheet.create({
  empty: {
    alignSelf: 'center',
    marginTop: hp(2),
    width: wp(100),
  },
});
