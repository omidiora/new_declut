import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import OverlayPreloader from '../../component/view/OverlayPreloader';
import {useAppDispatch} from '../../../redux/hook';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {hp, wp} from '../../utils/general';
import Modal from 'react-native-modal';
import {confirmPayment} from '../../../redux/payment/api';
import {SemiBoldText} from '../../utils/text';
import { Spacer } from '../../component/view';

const ConfirmPayment = props => {
  const {
    route: {params},
  } = props;
  const dispatch = useAppDispatch();
  const [displayText, setDisplayText] = useState('Text 1');
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation();
  const {colors} = useTheme();

  const state = useSelector(state => state?.payment);
  const {
    confirmPayment: confirmPaymentResult,
    paymentLoading,
    paymentSuccess,
    statusConfirmPayment,
  } = useSelector(state => state?.payment);

  console.log('====================================');
  console.log(params?.item?.trx_ref,'params');
  console.log('====================================');

  useEffect(() => {
    dispatch(
      confirmPayment(
        {
          payload: {
            trx_ref: params?.item?.trx_ref,
          },
        },
        navigation,
      ),
    );
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setToggle(prevToggle => !prevToggle);
  //     //   setDisplayText(prevText => (prevText === 'Text 1' ? 'Text 2' : 'Text 1'));
  //   }, 3000); // Change text every 10 seconds (10000 milliseconds)
  //   return () => clearInterval(interval);
  // }, []);

  // console.log(paymentSuccess, 'paymentSucces');
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>kandnkadnkn</Text>
      <Modal isVisible={true}>
        <View style={{alignSelf: 'center'}}>
          <ActivityIndicator color={colors.mainColor} size={'large'} />
          <Spacer/>
          <SemiBoldText color={colors.lightGrey}>Please Wait!!!.. Don't Cancel</SemiBoldText>
          <Spacer/>
          <SemiBoldText  color={colors.lightGrey} textAlign='center'>Validating Payment!!!</SemiBoldText>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: wp(20),
    height: hp(10),
    alignSelf: 'center',
    paddingHorizontal: 130,
    resizeMode: 'contain',
    marginTop: hp(30),
  },
  payment: {
    textAlign: 'center',
    fontSize: wp(4),
    marginHorizontal: 13,
    color: 'black',
    marginTop: 30,
  },
});
