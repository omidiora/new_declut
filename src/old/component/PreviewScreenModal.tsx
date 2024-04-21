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











// furniture.svg
const PreviewModal = ({onPress, visible, setModalVisible, item}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {data, loading, error, dismiss} = useAppSelector(
    state => state.payment,
  );


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
    setModalVisible(false)
  };

  console.log(uuid.v4(), 'lamdlamdml');
  return (
    <View>
      
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
                  <FormButton
                    onPress={() => OrderItemFunc()}
                    loading={loading}
                    btnTitle="Proceed to checkout"
                  />
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

export default PreviewModal;

const styles = StyleSheet.create({
  container: {
    height: HP(105),
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
    fontFamily: FontFamily.medium,
    color: COLOR.black,
    
  
  },
  cancel: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 13,
  },
});
