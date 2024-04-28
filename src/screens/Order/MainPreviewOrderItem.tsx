import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
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
import {confirmPickUp, orderPaymentApi} from '../../redux/payment/api';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import uuid from 'react-native-uuid';
import style from '../../Screen/Auth/ModalPickerImage/style';
import NumberCard from '../../component/NumberCard';
import FormButton from '../../component/FormButton';
import Spacer from '../../component/Spacer';
// import LineComponent from '../../component/ LineComponent';
import {COLOR, BODY_IMAGE, FontFamily, HP, WP} from '../../Util/Util';
import MessageModalComponent from '../../component/MessageModalComponent';

// furniture.svg
const MainPreviewOrderItem = ({onPress, visible, setModalVisible, item}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [modalVisible2, setModalVisible2] = useState(false);
  const [loadings, setLoading] = useState(false);

  const [visible3, setvisible3] = useState(false);
  const {data, loading, error, dismiss, paymentLoading} = useAppSelector(
    state => state.payment,
  );

  const ConfirmPick = () => {
    const payload = {
      complete_order: '1',
      item_id: item?.id,
      seller_id: item?.user?.id,
      reference: uuid.v4(),
    };
    dispatch(
      confirmPickUp(
        payload,
        navigation,
        setModalVisible,
        setModalVisible2,
        setLoading,
      ),
    );
  };

  const RejectItem = () => {
    const payload = {
      complete_order: 0,
      item_id: item?.id,
      seller_id: item?.user?.id,
      reference: uuid.v4(),
    };
    dispatch(
      confirmPickUp(
        payload,
        navigation,
        setModalVisible,
        setModalVisible2,
        setLoading,
      ),
    );
  };

  return (
    <View>
      <MessageModalComponent
        visible={modalVisible2}
        text="Your order is confirmed. Payment will be processed and the seller will be notified for pickup arrangements. Thank you for using Declut!"
        onPress={() => {
          setModalVisible2(false);
          navigation.navigate('OrderScreen');
        }}
      />
      <Modal isVisible={visible}>
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
                setModalVisible2(false);
                setModalVisible(false);
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
              onPress={() => ConfirmPick()}
              width={WP(87)}
              loading={loadings}
            />
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                setModalVisible2(false);
                setModalVisible(false);
                // setModalVisible3(false);
                // setText('');
                // setshowCancel(false);
                // navigation.goBack();
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainPreviewOrderItem;

const styles = StyleSheet.create({
  container2: {
    height: HP(65),
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
    width: WP(87),
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
