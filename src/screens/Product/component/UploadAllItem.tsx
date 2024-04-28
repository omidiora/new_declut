import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import VideoPlayer from 'react-native-video';

import Location from '../../../assets/images/svg/location.svg';
import Upload from '../../../assets/images/svg/upload.svg';
import Note from '../../../assets/images/UploadNote.svg';
import {
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  currencyFormatter,
} from '../../../old/Util/Util';
import {SIZES} from '../../../utils/theme/theme';
import HeaderComponent from '../../../old/component/HeaderComponent';
import OverlayPreloader from '../../../component/view/OverlayPreloader';
import {upCreateProductApi} from '../../../../redux/product/api';
import {useAppSelector, useAppDispatch} from '../../../../redux/hook';
import {SemiBoldText, fontSize} from '../../../utils/text';
import AddItemCardInfo from '../../../component/AddItemCardInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

const UploadAllItem = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const {width: screenWidth} = Dimensions.get('window');
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleSuccesModal, setVisibleSuccessModal] = useState(false);

  const width = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const entries = [];
  const {item, error} = useAppSelector(state => state.product);
  //   const [loading, setloading] = useState(false);

  const UploadItem = () => {
    const formData = new FormData();
    formData.append('item_name', item?.item_name);
    formData.append('category_id', item?.category);
    formData.append('description', item?.description);
    formData.append('state', item?.state);
    formData.append('area', item?.area);
    formData.append('price', item?.price);
    formData.append('item_condition', item?.condition);
    formData.append('defect_reason', item?.defect ? item?.defect : null);
    formData.append('brand', item?.brand);
    formData.append('seller_address', item?.address);
    formData.append('has_defect', item?.defect ? '1' : '0');
    formData.append('filepath[0]', item?.file?.payload[0]?.path);
    formData.append('filepath[1]', item?.file?.payload[1]?.path);
    formData.append('filepath[2]', item?.file?.payload[2]?.path);
    formData.append('filepath[3]', item?.file?.payload[3]?.path);

    dispatch(
      upCreateProductApi(
        formData,
        navigation,
        setVisible,
        setVisibleSuccessModal,
      ),
    );
  };

  useEffect(() => {
    // Simulated data fetching
    setData(
      Array.from({length: 10}, (_, index) => ({
        id: index,
        title: `Item ${index + 1}`,
      })),
    );
  }, []);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setActiveIndex(newIndex);
  };
  const renderItem = ({item}) => {
    console.log(item?.path, 'kkk');
    if (!item?.path.endsWith('.mp4')) {
      return (
        <View style={{width: screenWidth}}>
          <Image
            source={{
              uri: item?.path,
            }}
            style={{width: '100%', height: 350}}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
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
              uri: item?.path,
            }}
            style={{width: WP(100), height: HP(30)}}
            controls={false}
          />
        </View>
      );
    }
  };

  const PaginationDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View
        style={{
          width: screenWidth,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {route?.params?.item?.item_media.map((_, index) => (
          <View
            key={index}
            style={{
              width: 30,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                index === activeIndex ? COLOR.mainColor : 'lightgray',
            }}
          />
        ))}
      </View>
    </View>
  );

  console.log(item?.condition, '11jbjbb1j');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.white}}>
      {visible && <OverlayPreloader />}

      {/* <PreviewModal
        visible={visible}
        setModalVisible={setVisible}
        item={route?.params?.item}
      /> */}
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 2}}>
        <View style={styles.header}>
          <HeaderComponent
            title="Preview"
            rightText={true}
            rightComponent={true}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: HP(10)}}>
          <View style={{marginTop: 20,height:145}}>
            <AddItemCardInfo
              text={
                'Before proceeding, kindly review all your provided information for accuracy and completeness. Double-check to ensure everything is correct. Your satisfaction is our priority!'
              }
            />
            {/* <Note width={WP(100)} height={180} /> */}
          </View>

          <View style={{marginTop: -70}}>
            <FlatList
              ref={flatListRef}
              data={item?.file?.payload}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              onScroll={handleScroll}
              onMomentumScrollEnd={() => {
                // No need to update active index here
              }}
            />
          </View>
          <PaginationDots />

          <View style={styles.subContainer}>
            <View>
              <Text style={styles.posted}>
                Posted {route?.params?.item?.listed}
              </Text>
              <Text style={styles.item_name}>{item?.item_name}</Text>
              <View style={{flexDirection: 'row', marginVertical: HP(1)}}>
                <View style={styles.location}>
                  <Location />
                </View>
                <Text style={styles.address}>
                  {item?.area}, {item?.state}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descrtipionTitle}>Description</Text>
                <Text style={styles.descrip}>{item?.description}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.brand}>Brand :</Text>
                <Text style={styles.branded}>{item?.brand}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.brand}>Item Conditon : </Text>
                <Text style={styles.branded}>{item?.condition}</Text>
              </View>
              <View>
                <Text style={styles.brand}>Defect</Text>
                <Text style={styles.defect}>
                  {route?.params?.item?.defect_reason == null
                    ? 'None'
                    : route?.params?.item?.defect_reason}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.text}>Total Price</Text>
          <Text style={styles.price}>
            {NAIRA_SYSMBOL}
            {currencyFormatter(item?.price)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => UploadItem()}
          style={{
            flexDirection: 'row',
            backgroundColor: COLOR.mainColor,
            height: HP(7),
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            justifyContent: 'space-around',
            width: WP(45),
            borderRadius: 4,
            marginTop: 10,
            paddingBottom: 10,
          }}>
          <View>
            <Upload height={30} width={30} />
          </View>
          <SemiBoldText color="white" fontSize={fontSize.md} marginTop={5}>
            Upload
          </SemiBoldText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadAllItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  posted: {
    color: '#A28300',
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: WP(4),
  },
  dotStyle: {
    width: 25,
    height: 9,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: COLOR.mainColor,
    opacity: 100,
    zIndex: 1,
  },
  dotPagin: {
    position: 'absolute',
    top: HP(42),
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  subContainer: {
    // top: HP(-10),
    // paddingHorizontal: WP(4),
    height: HP(39),
    width: WP(100),
    padding: 30,
  },
  item_name: {
    fontFamily: 'Roboto-Bold',
    fontSize: WP(5),
    color: COLOR.black,
  },
  address: {
    fontFamily: 'Roboto-Bold',
    marginTop: -1,
  },
  location: {
    marginTop: 1,
    marginHorizontal: 3,
  },
  descriptionContainer: {
    marginTop: HP(3),
  },
  descrtipionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
    color: COLOR.black,
  },
  descrip: {
    fontFamily: 'Poppins-Light',
    fontSize: WP(4),
    color: COLOR.black,
  },
  brand: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
  },
  branded: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
  },
  rowItem: {
    flexDirection: 'row',
    marginVertical: WP(2),
  },
  defect: {
    fontFamily: 'Poppins-Light',
    fontSize: WP(4),
  },
  price: {
    fontFamily: FontFamily.bold,
    fontSize: WP(5.5),
    color: COLOR.black,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WP(95),
    borderTopWidth: 11,
    padding: HP(3),
    marginLeft: WP(2),
    borderColor: '#F2F4F7',
    backgroundColor: COLOR.white,
  },
  showInterest: {
    borderWidth: 1,
    width: WP(50),
    borderRadius: WP(12),
    borderColor: '#F2F4F7',
    height: HP(6.6),
    backgroundColor: COLOR.mainColor,
  },
  interest: {
    color: COLOR.white,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    padding: HP(1.3),
    fontSize: WP(4),
  },
  text: {
    fontFamily: FontFamily.regular,
    fontWeight: 'bold',
    fontSize: WP(3),
  },
  indicator: {
    marginTop: 10,
  },
  dot: {
    marginLeft: WP(80),
  },
  safetyTip: {
    backgroundColor: '#FEF0C7',
    // width: WP(90),
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: HP(3),
  },
  tips: {
    fontFamily: FontFamily.bold,
    color: COLOR.black,
    fontSize: WP(5),
  },
  note: {
    fontFamily: FontFamily.medium,
    color: COLOR.black,
  },
  header: {
    // marginTop: HP(3),
    width: '90%',
    marginLeft: 20,
    // height: HP(18),
  },
});
