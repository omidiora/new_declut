import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import HeaderComponent from '../../component/HeaderComponent';
import {
  BODY_IMAGE,
  COLOR,
  FontFamily,
  HP,
  NAIRA_SYSMBOL,
  WP,
  callNumber,
  currencyFormatter,
  sendOnWhatsApp,
} from '../../Util/Util';

import Entypo from 'react-native-vector-icons/Entypo';
import LineComponent from '../../component/ LineComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormButton from '../../component/FormButton';
import moment from 'moment';
import ViewContainer from '../../component/ViewContainer';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {confirmPickUp} from '../../redux/payment/api';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import ShowPrevewItem from '../../component/ShowPrevewItem';
import MainPreviewOrderItem from './MainPreviewOrderItem';

const OrderScreen = ({route}) => {
  const {getItem, setItem} = useAsyncStorage('@declut_user');
  const [user, setUser] = React.useState({});
  const [visible, setvisible] = React.useState(false);
  const dispatch = useDispatch();
  const readItemFromStorage = async () => {
    const item = await getItem();
    setUser(JSON.parse(item)?.user);
  };

  const navigation = useNavigation();
  React.useEffect(() => {
    readItemFromStorage();
  }, []);


  const RejectItem = () => {
    const payload = {
      complete_order: 0,
      item_id: route?.params?.params?.id,
      seller_id: route?.params?.params?.user?.id,
      reference: uuid.v4(),
    };
    dispatch(confirmPickUp(payload, navigation));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: WP(13),
        backgroundColor: COLOR.white,
      }}>
      <ViewContainer>
        <MainPreviewOrderItem
          visible={visible}
          setModalVisible={setvisible}
          item={route?.params?.params}
        />
        <View style={{backgroundColor: COLOR.white, paddingTop: 60}}>
          <HeaderComponent
            title={route?.params?.params?.order?.order_no || 'Order Item'}
            rightComponent={true}
            
          />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.paid}>
            <Text style={styles.item}>Item Paid For</Text>
            <TouchableOpacity>
              <Text style={styles.paidText}>
                {route?.params?.params?.order?.order_state}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Image
              source={{
                uri: route?.params?.params?.item_media?.[0]?.filepath,
              }}
              style={{width: WP(30), borderRadius: 15}}
            />
            <View style={{marginLeft: -10}}>
              <Text style={styles.seater}>
                {route?.params?.params?.item_name}
              </Text>
              <Text style={styles.naira}>
                {NAIRA_SYSMBOL}
                {currencyFormatter(route?.params?.params?.price)}
              </Text>
              <Text style={styles.location}>
                <Entypo name="location-pin" color={'red'} size={17} />
                {route?.params?.params?.area} , Lagos
              </Text>
              <Text style={styles.day}>
                Paid:{' '}
                {moment(route?.params?.params?.order?.updated_at).format(
                  'ddd, Do MMMM, YYYY',
                )}
                .
              </Text>
            </View>
          </View>
          <LineComponent />
          <View style={{marginLeft: -14}}>
            <View style={styles.info}>
              <Text style={styles.sellerInfo}>{"Seller's Information"}</Text>

              <View style={styles.cardInfo}>
                <Image source={BODY_IMAGE.avatar} />
                <View style={styles.itemSold}>
                  <Text style={styles.name}>
                    {route?.params?.params?.user?.name}
                  </Text>
                  <View style={styles.star}>
                    <AntDesign name="star" size={22} color={COLOR.orange} />
                    <Text style={styles.totalRating}>
                      {route?.params?.params?.user?.rating}(
                      {route?.params?.params?.user?.total_items_sold} items
                      sold)
                    </Text>
                  </View>
                </View>
              </View>
            </View>       
            {/* otal_items_sold */}
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>
                {route?.params?.params?.user?.name} contact information
              </Text>
              <Text
                style={[
                  styles.text,
                  {color: COLOR.mainColor, textDecorationLine: 'underline'},
                ]}>
                {route?.params?.params?.user?.phone_number}
              </Text>

              <View style={styles.btn}>
                <TouchableOpacity
                  style={[styles.btnInfo, {backgroundColor: 'black'}]}
                  onPress={() =>
                    callNumber(route?.params?.params?.user?.phone_number)
                  }>
                  <Text
                    style={[styles.text, {fontSize: 11, color: COLOR.white}]}>
                    Call Seller
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.btnInfo,
                    {borderColor: 'grey', borderWidth: 0.2},
                  ]}
                  onPress={() =>
                    sendOnWhatsApp(route?.params?.params?.user?.phone_number)
                  }>
                  <Text style={[styles.text, {fontSize: 11}]}>
                    Message seller
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.dear}>
            <Text style={styles.sellerInfo}>Dear {user?.name},</Text>
            <Text style={styles.dark}>
              Please feel free to get in touch with the seller promptly to
              arrange for item collection.{'\n'}
              {'\n'}We kindly advise you to personally inspect the item or guide
              the logistics company to verify its condition during the pick-up
              process. {'\n'}
              {'\n'} Upon the successful pick-up by either a designated logistic
              representative or yourself, the payment will be promptly
              transferred to the seller. It's important to note that any defects
              or discrepancies after the pick-up will not be the responsibility
              of Declut. {'\n'}
              {'\n'} If you're not fully satisfied with the item, we recommend
              refraining from initiating the pick-up.{'\n'}
              {'\n'}
              Thank you for your understanding and cooperation
            </Text>
          </View>
          <>
            <TouchableOpacity
              style={[styles.btn3, {backgroundColor: COLOR.mainColor}]}
              onPress={() => setvisible(true)}>
              <Text style={[styles.dont, {color: COLOR.white}]}>
                Confirm pickup
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.btn3, {backgroundColor: COLOR.mainColor}]}
              onPress={() => ConfirmPick()}>
              <Tet style={[styles.dont, {color: COLOR.white}]}>
                Go To Order History Screen
              </Tet>
            </TouchableOpacity> */}

            {/* */}
            {/* <FormButton
              btnTitle="Confirm Pickup"
              onPress={() => ConfirmPick()}
            /> */}
          </>
          <>
            <TouchableOpacity style={styles.btn3} onPress={() => RejectItem()}>
              <Text style={styles.dont}>I don’t like the item</Text>
            </TouchableOpacity>
            {/* <FormButton
              onPress={() => RejectItem()}
              btnTitle="I don’t like the item"
              btnColor={COLOR.white}
              COLOR={COLOR.black}
            /> */}
          </>
        </View>
      </ViewContainer>
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    marginTop: -1,
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: HP(3),
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  paidText: {
    color: COLOR.lightOrange,
    fontWeight: 'bold',
  },
  day: {
    color: COLOR.lightOrange,
    marginVertical: 4,
    fontWeight: 'bold',
    fontSize: WP(2.6),
    paddingBottom: 5,
    marginLeft: 4,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: WP(-13),
    marginVertical: 20,
  },
  item: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: WP(4),
    marginLeft: -10,
  },
  info: {
    marginTop: HP(3),
  },
  sellerInfo: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: WP(4),
  },
  star: {
    flexDirection: 'row',
    marginTop: HP(0.5),
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: WP(-30),
    marginTop: 20,
  },
  itemSold: {
    marginLeft: -110,
  },
  detailsContainer: {
    borderWidth: 1,
    // width: WP(90),
    minWidth: WP(80),
    maxWidth: WP(80),

    height: HP(20),
    paddingBottom: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderColor: COLOR.lightDeepBlue,
    backgroundColor: '#E0F7F6',
    // marginLeft: -5,
    borderRadius: 10,
  },
  text: {
    color: COLOR.black,
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: WP(4),
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    height: HP(5),

    justifyContent: 'space-between',
    marginTop: 3,
    // width: WP(40),
    // alignSelf: 'center',
    // alignItems: 'center',
  },
  btnInfo: {
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 1,
    width: WP(30),
    borderRadius: 5,
    // height: HP(5),
  },
  dear: {
    marginTop: HP(2),
    backgroundColor: '#FEF0C7',
    padding: 20,
    borderRadius: 20,
    marginLeft: -20,
  },
  dark: {
    fontWeight: '500',
    marginVertical: 20,
    color: 'black',
    fontFamily: FontFamily.regular,
  },
  btn2: {
    marginTop: HP(3),
    alignSelf: 'center',
    width: '100%',
    marginLeft: WP(4),
  },
  seater: {
    color: COLOR.lightGrey,
    fontWeight: 'bold',
    fontSize: WP(3.5),
    marginVertical: 4,
  },
  naira: {
    fontWeight: 'bold',
    marginLeft: WP(1),
    color: COLOR.mainBlack,
    paddingBottom: 4,
  },
  location: {
    color: COLOR.lightGrey,
    fontWeight: '700',
  },
  totalRating: {
    marginTop: 4.5,
    color: COLOR.lightGrey,
    fontWeight: 'bold',
  },
  name: {
    fontFamily: FontFamily.medium,
    color: COLOR.black,
    marginLeft: 3,
  },
  dont: {
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    color: COLOR.mainBlack,
    bottom:3,
    fontSize:WP(4.5)
  },
  btn3: {
    paddingTop: HP(3),
    borderWidth: 0.3,
    padding: 15,
    borderRadius: WP(1.5),
    width: WP(80),
    marginLeft: -18,
    marginTop: HP(2),
  },
});
