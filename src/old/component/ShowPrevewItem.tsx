import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import QuickCard from './QuickCard';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../Util/Util';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import LineComponent from './ LineComponent';
import Spacer from './Spacer';
import Electronics from '../../../assets/images/svg/elect.svg';
import Furniture from '../../../assets/images/svg/furniture.svg';
import Clothing from '../../../assets/images/svg/Clothing.svg';
import Baby from '../../../assets/images/svg/Baby.svg';
import Pet from '../../../assets/images/svg/Pet.svg';
import Sport from '../../../assets/images/svg/Sport.svg';
import Ant from '../../../assets/images/svg/Ant.svg';
import Health from '../../../assets/images/svg/Health.svg';
import Kitchen from '../../../assets/images/svg/Kitchen.svg';
import Music from '../../../assets/images/svg/Music.svg';
import Office from '../../../assets/images/svg/Office.svg';
import Book from '../../../assets/images/svg/Book.svg';
import Art from '../../../assets/images/svg/Art.svg';
import Auto from '../../../assets/images/svg/Auto.svg';
import Garden from '../../../assets/images/svg/Garden.svg';
import Miss from '../../../assets/images/svg/Miss.svg';
import Game from '../../../assets/images/svg/Game.svg';
import NumberCard from './NumberCard';
import ViewContainer from './ViewContainer';
import FormButton from './FormButton';
import {orderPaymentApi} from '../redux/payment/api';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import uuid from 'react-native-uuid';
import style from '../Screen/Auth/ModalPickerImage/style';

// furniture.svg
const ShowPrevewItem = ({onPress, visible, setModalVisible, item}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [visible3, setvisible3] = useState(false);
  const {data, loading, error, dismiss} = useAppSelector(
    state => state.payment,
  );
  console.log(dismiss, 'sskdauudankn');

  const OrderItemFunc = () => {
    // setloading(true);
    dispatch(
      orderPaymentApi({
        payload: {
          id: item.id,
          trx_ref: uuid.v4(),
          item_amount: item?.price,
        },
        navigation,
      }),
    );
    //
    setModalVisible(false);
  };

  return (
    <View>
      <Modal isVisible={visible3}>
        <View style={styles.container2}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingTop: HP(1),
              paddingBottom: HP(4),
            }}>
            <Text style={styles.not}>Note</Text>
            <TouchableOpacity
              onPress={() => {
                setvisible3(false);
              }}>
              <Entypo name="circle-with-cross" size={32} color={COLOR.black} />
            </TouchableOpacity>
          </View>
          <Text style={styles.informed}>
            Please be informed that clicking the 'Confirm Pickup' button
            signifies the completion of the order process. This action initiates
            the transfer of funds to the seller and is irreversible. Kindly
            ensure that you are ready to proceed before confirming.
          </Text>
          <View style={styles.btn}>
            <FormButton
              btnTitle="Proceed to confirm"
              onPress={() => OrderItemFunc()}
              width={WP(90)}
              loading={loading}
            />
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                // setText('');
                // setshowCancel(false);
                // navigation.goBack();
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!dismiss && (
        <>
          <Modal isVisible={visible}>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                }}>
                <Text style={styles.categories}>Order Process</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Entypo
                    name="circle-with-cross"
                    size={32}
                    color={COLOR.black}
                  />
                </TouchableOpacity>
              </View>
              <Spacer height={10} />
              <LineComponent />

              <View>
                <NumberCard
                  number={''}
                  title={'Step 1 : Make Payment'}
                  content={`To express your interest in the item, please proceed by making the required payment.`}
                />
                <NumberCard
                  number={''}
                  title={'Step 2: Details of the Item Owner/Seller '}
                  content={`Upon successful payment, you will promptly receive the details of the item's owner or seller. This step finalizes the transaction and is irreversible. Should you choose to withdraw your interest at this point, a nominal 10% charge will be applicable from your payment.`}
                />
                <NumberCard
                  number={''}
                  title={'Step 3: Refund Process'}
                  content={`If, upon visiting the pick-up location, you find yourself unsatisfied with the item, rest assured that you are eligible for a 100% refund.`}
                />
                <View
                  style={{
                    backgroundColor: '#FEF0C7',
                    borderRadius: WP(3),
                    paddingBottom: WP(10),
                    padding: 10,
                  }}>
                  <Text style={styles.note}>Note</Text>
                  <Text style={styles.note}>
                    {'\n'}
                    Kindly note that item pick-up should be arranged within a
                    48-hour timeframe. Refunds due to change of heart, distance
                    and logistical considerations are subject to a 10% service
                    charge.
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    Before proceeding with your payment, please ensure that you
                    can conveniently access the pick-up location within the
                    specified time.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                    width: WP(100),
                    marginLeft: WP(9),
                    marginTop: HP(1.3),
                  }}>
                  <View>
                    <FormButton
                      onPress={() => {
                        setModalVisible(false);
                        setvisible3(true);
                      }}
                      width={WP(90)}
                      btnTitle="Proceed to checkout"
                    />
                  </View>
                  <View style={{marginTop: 12}}>
                    <FormButton
                      btnColor={COLOR.lightBlue}
                      btnTitle="Cancel"
                      COLOR={'black'}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default ShowPrevewItem;

const styles = StyleSheet.create({
  container2: {
    height: HP(53),
    width: WP(100),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginLeft: -18,
    // alignSelf:"center"
  },
  container: {
    // height: HP(40),
    width: WP(101),
    backgroundColor: 'white',
    marginLeft: -25,
    borderRadius: 10,
    padding: 20,
    // alignSelf:"center"
  },
  quickCardContainer: {
    marginTop: HP(1),
    marginBottom: HP(3),
    marginHorizontal: WP(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categories: {
    fontWeight: 'bold',
    fontSize: HP(2),
    paddingLeft: WP(1),
    color: COLOR.black,
    marginTop: HP(1.5),
  },
  note: {
    fontFamily: FontFamily.bold,
    color: COLOR.black,
  },
  cancel: {
    paddingTop: HP(3),
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 10,
    padding: 20,
    width: WP(90),
    borderColor: '#D0D5DD',
  },
  cancelText: {
    fontWeight: 'bold',
    paddingLeft: WP(-7),
    fontSize: WP(3.4),
    color: COLOR.black,
    textAlign: 'center',

    // marginLeft:10
  },
  not: {
    color: COLOR.mainBlack,
    fontSize: WP(5),
    fontFamily: FontFamily.medium,
  },
  informed: {
    color: COLOR.mainBlack,
    fontFamily: FontFamily.medium,
  },
  btn: {
    marginTop: 15,
  },
});
