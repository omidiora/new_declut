import {
  ActivityIndicator,
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
import {
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
} from '../../component/view/button';
import moment from 'moment';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
// import Modal from 'react-native-modal';
import Modal from 'react-native-modal';

import FeaturedIconn from '../../assets/images/Featuredicon.svg';
import {confirmPickUp, rejectPickUp} from '../../../redux/payment/api';
import uuid from 'react-native-uuid';
import SuccessIcon from '../../assets/images/successicon.svg';
import {LineComponent} from '../Home/component';
import Avatar, {IconTypes, Sizes} from 'rn-avatar';
import {SIZES} from '../../utils/theme/theme';
import UserAvatar from 'react-native-user-avatar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Emoji from '../../assets/images/emoji21.svg';
import {Image} from 'react-native';
import {experienceApi, ratingApi} from '../../../redux/product/api';

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

const RatingExperience = [
  {
    id: 1,
    image: require('../../assets/images/eemoji.png'),
  },
  {
    id: 2,
    image: require('../../assets/images/eemoji2.png'),
  },
  {
    id: 3,
    image: require('../../assets/images/eemoji3.png'),
  },
  {
    id: 4,
    image: require('../../assets/images/eemoji4.png'),
  },
  {
    id: 5,
    image: require('../../assets/images/eemoji5.png'),
  },
];
const RatingScreen = ({route}) => {
  const {colors} = useTheme();
  const [value, setValue] = useState('');
  const {getItem} = useAsyncStorage('@declut');
  const state = useSelector(state => state);
  const navigation = useNavigation();
  const [isModal, setModalVisible] = useState(false);
  const [isModal2, setModalVisible2] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [user, setUser] = React.useState({});
  const ratingLoading = useSelector(state => state.product.ratingLoading);

  const dispatch = useDispatch();
  const getUserDetail = async () => {
    const item = await getItem();
    setUser(JSON.parse(item));
  };

  React.useEffect(() => {
    getUserDetail();
  }, []);

  const RateUser = value => {
    let payload = {
      rate: value,
      seller_id: route.params?.params?.order?.seller_id,
      order_id: route.params?.params?.order?.id,
    };
    dispatch(ratingApi(payload));
  };

  const userExperience = (id, description) => {
    console.log(id, description);
    let payload = {
      rate: value,
      seller_id: route.params?.params?.order?.seller_id,
      order_id: route.params?.params?.order?.id,
    };
    dispatch(experienceApi(payload));
  };

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader title={route?.params?.params?.order?.order_no} />
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ViewContainer paddingVertical={20} paddingHorizontal={27}>
          <Row justifyContent="space-between" disabled={true}>
            <SemiBoldText fontSize={fontSize.md} color={colors.darkBlack}>
              Item paid for
            </SemiBoldText>
            <SemiBoldText fontSize={fontSize.sm + 2} color={colors.orange}>
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

          <LineComponent />
          <Spacer height={20} />
          {/* <PrimaryButton
            backgroundColor={colors.mainColor}
            text="Confirm pickup"
            onPress={() => setModalVisible(true)}
          /> */}
          <Spacer />

          <SemiBoldText
            color="black"
            textAlign="center"
            fontSize={fontSize.md + 2}>
            Rate Seller
          </SemiBoldText>
          <Spacer />
          <View style={{alignSelf: 'center'}}>
            <UserAvatar size={100} name={user?.name} bgColors={['green']} />
            <Spacer height={30} />
            <SemiBoldText color="black" fontSize={fontSize.md}>
              {user?.name}
            </SemiBoldText>
            <Spacer />
          </View>
          <Row alignItems="center" justifyContent="center">
            <AntDesign color={'#FBBF24'} name="star" size={15} />
            <SemiBoldText marginTop={2} fontSize={fontSize.md}>
              {route.params?.params?.order?.rating} rating
            </SemiBoldText>
          </Row>

          {ratingLoading ? (
            <ActivityIndicator color={'green'} size={'small'} />
          ) : (
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Average', 'Good', 'Excellent']}
              defaultRating={0}
              size={20}
              onFinishRating={value => {
                RateUser(value);
              }}
            />
          )}
          <Spacer height={30} />
          <LineComponent />

          <Spacer height={30} />

          <SemiBoldText fontSize={fontSize.md} color="black" textAlign="center">
            How’s your experience so far?
          </SemiBoldText>

          <Spacer />
          <Row justifyContent="center">
            <TouchableOpacity onPress={() => userExperience(1, 'Terrible')}>
              <Text style={{fontSize: 30, color: 'black'}}>😖 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => userExperience(2, 'Bad')}>
              <Text style={{fontSize: 30, color: 'black'}}> 😒</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => userExperience(3, 'Average')}>
              <Text style={{fontSize: 30, color: 'black'}}> 😐 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => userExperience(4, 'Good Service')}>
              <Text style={{fontSize: 30, color: 'black'}}> 🙂 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => userExperience(4, 'Excellent Service')}>
              <Text style={{fontSize: 30, color: 'black'}}> 😍</Text>
            </TouchableOpacity>
          </Row>
          <Spacer height={70} />

          <SecondaryButton backgroundColor={'#02A89E'}
           text="Support" />
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

export default RatingScreen;

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
    fontSize: 14,
    lineHeight: 23,
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
