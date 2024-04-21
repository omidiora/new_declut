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
import {
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  currencyFormatter,
} from '../../Util/Util';
import VideoPlayer from 'react-native-video';
import ViewContainer from '../../component/ViewContainer';
import LineComponent from '../../component/ LineComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Location from '../../assets/images/svg/location.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadNote from '../../assets/images/UploadNote.svg';
import {useAppDispatch} from '../../redux/hook';
import {orderPaymentApi} from '../../redux/payment/api';
import ModalComponent from '../Home/component/ModalSeeAllComponent';
import uuid from 'react-native-uuid';
import ShowPrevewItem from '../../component/ShowPrevewItem';

const PreviewOrderItem = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const {width: screenWidth} = Dimensions.get('window');
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);

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
    return (
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
                style={{width: WP(100), height: HP(30)}}
                controls={true}
              />
            </View>
          </>
        )}

        {!item.filepath.endsWith('.mp4') && (
          <View>
            <View style={{width: screenWidth}}>
              <Image
                source={{uri: item.filepath}}
                style={{width: '100%', height: WP(100)}}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const OrderItemFunc = () => {
    setloading(true);
    dispatch(
      orderPaymentApi({
        payload: {
          id: route?.params?.item.id,
          trx_ref: uuid.v4(),
          item_amount: route?.params?.item?.price,
        },
        navigation,
      }),
    );
    //
    setloading(false);
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
          position: 'absolute',
          bottom: 30,
        }}>
        {route?.params?.item?.item_media.map((_, index) => (
          <View
            key={index}
            style={{
              width: index === activeIndex ? 18 : 8,
              height: 8,
              borderRadius: 30,
              backgroundColor:
                index === activeIndex ? COLOR.mainColor : COLOR.lightMain,
              marginHorizontal: 2,
            }}
          />
        ))}
      </View>
    </View>
  );

  console.log(route?.params?.item?.item_media, '11');

  return (
    <View style={{flex: 1}}>
     
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          zIndex: 100,
          top: HP(4),
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color={COLOR.white} size={25} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.dot}>
          <Entypo name="dots-three-vertical" color={COLOR.white}  size={20}  />
        </TouchableOpacity> */}
      </View>

      <FlatList
        ref={flatListRef}
        data={route?.params?.item?.item_media}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        onScroll={handleScroll}
        onMomentumScrollEnd={() => {
          // No need to update active index here
        }}
      />
      <PaginationDots />
      <View>
        <ScrollView
          style={styles.subContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: HP(10)}}>
          <Text style={styles.posted}>
            Posted {route?.params?.item?.listed}
          </Text>
          <Text style={styles.item_name}>{route?.params?.item?.item_name}</Text>
          <View style={{flexDirection: 'row', marginVertical: HP(1)}}>
            <View style={styles.location}>
              <Location />
            </View>
            <Text style={styles.address}>
              {route?.params?.item?.area}, {route?.params?.item?.state}
            </Text>
          </View>
          <View style={styles.line}>
            <LineComponent width={WP(0.2)} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descrtipionTitle}>Description</Text>
            <Text style={styles.descrip}>
              {route?.params?.item?.description}
            </Text>
          </View>
          <View style={styles.line}>
            <LineComponent width={WP(0.2)} />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.brand}>Brand :</Text>
            <Text style={styles.branded}>{route?.params?.item?.brand}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.brand}>Item Conditon : </Text>
            <Text style={styles.branded}>
              {route?.params?.item?.item_condition}
            </Text>
          </View>
          <View>
            <Text style={styles.brand}>Defect</Text>
            <Text style={styles.defect}>
              {route?.params?.item?.defect_reason == null
                ? 'None'
                : route?.params?.item?.defect_reason}
            </Text>
          </View>

          <View style={styles.line}>
            <LineComponent width={WP(0.2)} />
          </View>

          <View style={styles.safetyTip}>
            <Text style={styles.tips}>Safety Tips</Text>
            <Text style={styles.note}>
              {'\n'}
              Please note that we will never initiate the first contact with you
              to ensure your safety from potential scammers. {'\n'}
              {'\n'}
              If this item aligns with your requirements, kindly click on 'Show
              Interest' to proceed.{'\n'}
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
              {'\n'} Before proceeding with your payment, please ensure that you
              can conveniently access the pick-up location within the specified
              time. {'\n'}
              {'\n'}Please be informed that refunds will be processed once all
              terms and conditions have been met.{'\n'}
              {'\n'} Thank you for your understanding and cooperation.
              {'\n'}
            </Text>

            <TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontFamily: FontFamily.bold,
                  textDecorationLine: 'underline',
                  color: COLOR.black,
                }}>
                Report Item
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.text}>Total Price</Text>
            <Text style={styles.price}>
              {NAIRA_SYSMBOL}
              {currencyFormatter(route?.params?.item?.price)}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.showInterest}
              onPress={() => setVisible(true)}>
              {loading ? (
                <View style={styles.indicator}>
                  <ActivityIndicator color={'black'} size={'large'} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => setVisible(true)}>
                  <Text style={styles.interest}>Show Interest</Text>
                  <View style={{marginTop: HP(1.7), marginLeft: WP(-10)}}>
                    <Ionicons
                      name="arrow-forward"
                      color={COLOR.white}
                      size={22}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PreviewOrderItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  posted: {
    color: '#A28300',
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: WP(3),
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
    marginTop: HP(1),
  },
  descrtipionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: WP(4),
    color: COLOR.black,
  },
  descrip: {
    fontFamily: FontFamily.medium,
    fontSize: WP(3.5),
    color: COLOR.mainBlack,
    paddingTop: 10,
    paddingBottom: 10,
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
    borderTopWidth: 1,
    padding: HP(3),
    marginLeft: WP(2),
    borderColor: '#F2F4F7',
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
    fontSize: WP(5),
  },
  text: {
    fontFamily: FontFamily.regular,
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
    fontSize: WP(4.3),
  },
  note: {
    fontFamily: FontFamily.bold,
    color: COLOR.grey,
  },
  line: {
    marginVertical: 10,
  },
});
