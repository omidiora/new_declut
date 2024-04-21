import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {TopHeader} from '../../component/view/headers/topHeader';
import {BoldText, RegularText, SemiBoldText, fontSize} from '../../utils/text';
import Entypo from 'react-native-vector-icons/Entypo';
import DummyImage from '../../assets/images/image.svg';
import {
  NAIRA_SYSMBOL,
  callNumber,
  hp,
  removeFirstName,
  sendOnWhatsApp,
  wp,
} from '../../utils/general';
import Location from '../../assets/images/location.svg';
import DummyPhoto from '../../assets/images/photo.svg';
import styled from '@emotion/native';
import StarRating from '../../assets/images/star.svg';
import {OutlineButton, PrimaryButton} from '../../component/view/button';
import moment from 'moment';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
// import Modal from 'react-native-modal';
import Modal from 'react-native-modal';

import FeaturedIconn from '../../assets/images/Featuredicon.svg';
import {confirmPickUp, rejectPickUp} from '../../../redux/payment/api';
import uuid from 'react-native-uuid';
import SuccessIcon from '../../assets/images/successicon.svg';
const LocationIcon = styled(Location)({
  top: 5,
});
const SellerDetailCard = styled.View({
  borderWidth: 1,
  // width: wp(90),
  minWidth: wp(85),
  maxWidth: wp(8),

  height: hp(20),
  paddingBottom: 30,
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  borderColor: 'blue',
  backgroundColor: '#E0F7F6',
  // marginLeft: -5,
  borderRadius: 10,
});

const BtnCall = styled.TouchableOpacity({
  borderWidth: 1,
  marginHorizontal: 20,
  padding: 12,
  width: wp(30),
  borderRadius: 10,
});

const ModalContainer = styled.View({
  paddingTop: 20,
  height: 450,
  width: 350,
  backgroundColor: 'white',
  borderRadius: 20,
  alignSelf: 'center',
});

const SuccessIconView = styled(SuccessIcon)({
  alignSelf: 'center',
});

const OrderDetailScreen = ({route}) => {
  const {colors} = useTheme();
  const [value, setValue] = useState('');
  const {getItem} = useAsyncStorage('@declut');
  const state = useSelector(state => state);
  const navigation = useNavigation();
  const [isModal, setModalVisible] = useState(false);
  const [isModal2, setModalVisible2] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const dispatch = useDispatch();
  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(JSON.parse(item));
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, []);
  const ConfirmPick = () => {
    const payload = {
      complete_order: '1',
      item_id: route?.params?.params?.id,
      seller_id: route?.params?.params?.order?.seller_id,
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
  const rejectPickUpApi = () => {
    const payload = {
      complete_order: '0',
      item_id: route?.params?.params?.id,
      seller_id: route?.params?.params?.order?.seller_id,
      reference: uuid.v4(),
    };
    dispatch(
      rejectPickUp(
        payload,
        navigation,
        setModalVisible,
        setModalVisible2,
        setLoading2,
      ),
    );
  };
  //  rejectPickUp
  console.log(route?.params?.params?.order?.seller_id);

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader borderBottom title={route?.params?.params?.order?.order_no} />
      <ScrollView>
        <ViewContainer paddingVertical={20} paddingHorizontal={27}>
          <Row justifyContent="space-between" disabled={true}>
            <SemiBoldText fontSize={fontSize.md} color={colors.darkBlack}>
              Item paid for
            </SemiBoldText>
            <SemiBoldText fontSize={fontSize.sm + 2} color={colors.orange
            }>
              {route?.params?.params?.order?.order_state}
            </SemiBoldText>
          </Row>
          <Spacer height={40} />
          <Row disabled={true} flexDirection="row">
            <DummyImage />
            <HSpacer />
            <View flexDirection="column">
              <SemiBoldText
                fontSize={fontSize.sm + 2}
                color={colors.mediumGrey}>
                {route?.params?.params?.item_name}
              </SemiBoldText>
              <Spacer height={10} />
              <SemiBoldText fontSize={fontSize.sm + 2} color={colors.darkBlack}>
                {NAIRA_SYSMBOL}
                {route?.params?.params?.price}
              </SemiBoldText>
              <Spacer height={10} />
              <SemiBoldText color={colors.mediumGrey}>
                <LocationIcon />
                {route?.params?.params?.area}
                {route?.params?.params?.state}
              </SemiBoldText>
              <Spacer height={10} />
              <SemiBoldText color={colors.orange}>
                Paid:{' '}
                {moment(route?.params?.params?.order?.updated_at).format(
                  'ddd, Do MMMM, YYYY',
                )}
              </SemiBoldText>
            </View>
          </Row>
          <Spacer height={40} />
          <BoldText fontSize={fontSize.md} color={colors.darkBlack}>
            Seller’s information
          </BoldText>
          <Spacer />
          <Row disabled={true}>
            <DummyPhoto />
            <HSpacer />
            <Row flexDirection="column">
              <Spacer height={3} />
              <BoldText fontSize={fontSize.md} color={colors.darkBlack}>
                {route?.params?.params?.user?.name}
              </BoldText>
              <Spacer height={5} />
              <Row disabled={true}>
                <StarRating />
                <View style={{marginTop: 3}}>
                  <RegularText color="black"> 0.0</RegularText>
                </View>
              </Row>
            </Row>
          </Row>

          <SellerDetailCard>
            <Spacer />
            <SemiBoldText fontSize={fontSize.sm + 2} color="black">
              {route?.params?.params?.user?.name} contact information
            </SemiBoldText>
            <Spacer height={10} />
            <SemiBoldText color={colors.mainColor} fontSize={fontSize.lg - 2}>
              {route?.params?.params?.user?.phone_number}
            </SemiBoldText>

            <Row marginTop={15}>
              <BtnCall
                style={[{backgroundColor: 'black'}]}
                onPress={() =>
                  callNumber(route?.params?.params?.user?.phone_number)
                }>
                <SemiBoldText textAlign="center" color="white">
                  Call Seller
                </SemiBoldText>
              </BtnCall>

              <BtnCall
                style={[
                  {borderColor: 'grey', borderWidth: 0.2, borderRadius: 5},
                ]}
                onPress={() =>
                  sendOnWhatsApp(route?.params?.params?.user?.phone_number)
                }>
                <SemiBoldText textAlign="center" color={colors.darkBlack}>
                  Message Seller
                </SemiBoldText>
              </BtnCall>
            </Row>
          </SellerDetailCard>
          <View style={styles.dear}>
            <SemiBoldText fontSize={fontSize.md} color={colors.darkBlack}>
              Dear {removeFirstName(value.name)},
            </SemiBoldText>
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
              Thank you for your understanding and cooperation.
            </Text>
          </View>
          <Spacer />

          <PrimaryButton
            backgroundColor={colors.mainColor}
            text="Confirm pickup"
            onPress={() => setModalVisible(true)}
          />
          <Spacer />
          <OutlineButton
            backgroundColor={colors.mainColor}
            color={colors.mediumGrey}
            style={{borderWidth: 1, borderColor: '#D0D5DD'}}
            title="I don’t like the item"
            onPress={() => rejectPickUpApi()}
            isLoading={loading2}
          />
          <Spacer />
        </ViewContainer>
        <Modal 
          transparent={true}
           visible={isModal}
           backdropColor="grey"
          hasBackdrop={true}
           backdropOpacity={1}
          >
          <ModalContainer>
            <ViewContainer>
              <Row
                flexDirection="row"
                disabled={true}
                paddingVertical={10}
                justifyContent="space-between">
                <BoldText color="black" fontSize={16}>
                  Note
                </BoldText>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <FeaturedIconn />
                </TouchableOpacity>
              </Row>
              <Spacer />
              <RegularText color="#344054" fontSize={fontSize.sm + 2}>
                Please be informed that clicking the 'Confirm Pickup' button
                signifies the completion of the order process. This action
                initiates the transfer of funds to the seller and is
                irreversible. Kindly ensure that you are ready to proceed before
                confirming.
              </RegularText>
              <Spacer />
              <PrimaryButton
                // isLoading={isLoading}
                text="Proceed to confirm"
                backgroundColor={colors.mainColor}
                onPress={() => ConfirmPick()}
                isLoading={loading}
              />
              <Spacer />
              <OutlineButton
                backgroundColor={colors.mainColor}
                color={colors.mediumGrey}
                style={{borderWidth: 1, borderColor: '#D0D5DD'}}
                title="Cancel"
                onPress={() => rejectPickUpApi()}
                isLoading={loading2}
              />
            </ViewContainer>
          </ModalContainer>
        </Modal >

        <Modal 
         transparent={false}
          visible={isModal2}
          //  backdropColor="lightGrey"
          hasBackdrop={true}
          //  backdropOpacity={211}
          
          
          >
          <ModalContainer>
            <ViewContainer>
              <SuccessIconView />
              <Spacer />
              <BoldText color="#101828" fontSize={20} textAlign="center">
                Success
              </BoldText>
              <Spacer />
              <SemiBoldText
                color="#344054"
                fontSize={fontSize.sm + 2}
                textAlign="center">
                Your order is confirmed. Payment will be processed and the
                seller will be notified for pickup arrangements. Thank you for
                using Declut!
              </SemiBoldText>

              <Spacer height={50} />
              <OutlineButton
                backgroundColor={colors.mainColor}
                color={colors.mediumGrey}
                style={{borderWidth: 1, borderColor: '#D0D5DD'}}
                title="Close"
                onPress={() => {
                  setModalVisible2(false);
                  navigation.navigate("BottomNavigation");
                }}
              />
            </ViewContainer>
          </ModalContainer>
        </Modal >
      </ScrollView>
    </BaseView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  dear: {
    marginTop: hp(2),
    backgroundColor: '#FEF0C7',
    padding: 20,
    borderRadius: 20,
    // marginLeft: -20,
  },
  dark: {
    // fontWeight: '500',
    marginVertical: 20,
    color: '#344054',
    fontSize:14,
    lineHeight:23
  },
  btn2: {
    marginTop: hp(3),
    alignSelf: 'center',
    width: '100%',
    marginLeft: wp(4),
  },
  seater: {
    fontWeight: 'bold',
    fontSize: wp(3.5),
    marginVertical: 4,
  },
  naira: {
    fontWeight: 'bold',
    marginLeft: wp(1),
    paddingBottom: 4,
  },
});
