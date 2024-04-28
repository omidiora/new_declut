import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../old/component/ViewContainer';
import FormInput from '../../old/component/FormInput';
import FormButton from '../../old/component/FormButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLOR, HP, WP} from '../../old/Util/Util';
import {useDispatch, useSelector} from 'react-redux';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import HeaderComponent from '../../old/component/HeaderComponent';
import {useFormik} from 'formik';
import {SIZES} from '../../utils/theme/theme';
import HeaderComponent2 from '../../old/component/HeaderComponent2';
import {editProfileApi} from '../../../redux/auth/profile';
import {TopHeader} from '../../component/view/headers/topHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import {PrimaryButton} from '../../component/view/button';
import {Row, Spacer} from '../../component/view';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from '@emotion/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Avatar as RNEAvatar, AvatarProps} from '@rneui/themed';
import {Avatar} from '@rneui/themed';
import {fontPixel} from '../../utils/theme/pxToDpConvert';
import UploadIcon from '../../assets/images/upload.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AlertNofityError} from '../../utils/notify';
import {upLoadFileApi} from '../../../redux/product/api';

const CameraIcon = styled.TouchableOpacity(({theme}) => ({
  position: 'absolute',
  backgroundColor: theme.colors.card,
  borderWidth: 1,
  height: RFValue(20),
  width: RFValue(20),
  borderRadius: RFValue(15 / 2),
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3,
  borderColor: theme.colors.primary,
  bottom: 7,
  right: RFValue(15),
}));
const EditProfile = () => {
  const {getItem} = useAsyncStorage('@declut');
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState({});
  const {colors} = useTheme();
  // const userDetail = useSelector(state => state?.auth?.user);
  const phoneInput = React.useRef<PhoneInput>(null);
  const loading = useSelector(state => state.profile.loading);
  const [details, setDetails] = React.useState(userDetail);
  const [cameraPermission, setCameraPermission] = React.useState(false);
  const [imageItem, setImageItem] = React.useState({});
  const imageUrl = useSelector(
    state => state?.product?.profilePicture?.data?.[0]?.path,
  );
  const {getItem: getUserDetails, setItem} = useAsyncStorage('@declut');

  let Profile = true;
  const navigation = useNavigation();
  const retrieveStoredDetail = async () => {
    const json = await getItem();
    console.log(json, 'd');
    const user_data = json != null ? JSON.parse(json) : {};
    setUserDetail(user_data);
    setInitialFormValues(user_data);
    // dispatch(setCredential(user_data ?? {}));
  };

  function removeCountryCode(phoneNumber: string, countryCode: string) {
    // Check if the phone number starts with the country code
    if (phoneNumber && phoneNumber.startsWith(countryCode)) {
      // Remove the country code by slicing the string
      return phoneNumber.slice(countryCode.length);
    }

    return phoneNumber;
  }

  React.useEffect(() => {
    retrieveStoredDetail();
  }, [values]);

  const updateUser = () => {
    let formData = new FormData();
    // formData.append("avatar","")
    dispatch(
      editProfileApi({
        name: values?.name,
        email: values?.email,
        phone_number: values?.phone,
        id: userDetail?.id,
        navigation: navigation,
        avatar: imageUrl,
        setItem:setItem
      }),
    );
  };

  //  const as=useSelector(state=>state);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      name: '',
      // .replace(/ /g, '').replace('+234', '')
      phone: '',
      email: '',
    },
    onSubmit: values => {
      updateUser();
    },
  });

  const setInitialFormValues = user => {
    setFieldValue('name', user?.name || ''); // Set name field
    setFieldValue('phone', user?.phone_number || ''); // Set phone field
    setFieldValue('email', user?.email || ''); // Set email field
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera to update your profile ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission(true);
        console.log('You can use the camera');
      } else {
        setCameraPermission(false);
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const ImagePicker = async () => {
    console.log('image picker');
    try {
      let options = {
        // includeBase64: true,
        quality: 1,
        mediaType: 'phots',
      };
      const result = await launchImageLibrary(options);
      if (imageItem && imageItem.assets && imageItem.assets[0]) {
        const formData = new FormData();
        formData.append('path', 'profile');
        formData.append('file[0]', {
          uri:
            Platform.OS === 'ios'
              ? imageItem?.assets?.[0]?.uri?.replace('file://', '')
              : imageItem?.assets?.[0]?.uri,
          type: imageItem?.assets?.[0]?.type,

          name: imageItem?.assets?.[0]?.fileName,
        });

        // alert('success');

        // console.log('got to ');

        dispatch(upLoadFileApi(formData, navigation, Profile));
      }
      setImageItem(result);
    } catch (err) {
      AlertNofityError('Error ', 'Something Went wrong!!!. Try again!!!');
      console.log(err, 'err from uploading');
    }
  };

  // console.log(imageItem?.assets?.[0]?.uri,'aldalm');

  console.log('====================================');
  console.log(imageUrl,'imageUrl');
  console.log('====================================');
  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <View style={{marginLeft: 5}}>
        <TopHeader title={'Account Details'} />
        {/* <HeaderComponent2 title={'Account Details'}  /> */}
      </View>
      <ViewContainer>
        <KeyboardAwareScrollView
          style={styles.content}
          contentContainerStyle={{paddingBottom: 110}}>
          <Spacer />

          <Row alignItems="center" justifyContent="center">
            <Row style={{flexShrink: 1}}>
              <Avatar
                onPress={() => ImagePicker()}
                size={150}
                titleStyle={{color: 'green'}}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
                }}
                rounded
                containerStyle={{
                  borderWidth: 4,
                  borderColor: '#02A89E',
                  borderRadius: 100,
                  backgroundColor: 'transparent',
                }}
              />
              <CameraIcon>
                <UploadIcon width={70} height={50} />
              </CameraIcon>
            </Row>
          </Row>
          <FormInput
            placeholder=""
            label="Full Name"
            required
            value={values?.name}
            onChangeText={handleChange('name')}
          />
          <FormInput
            placeholder=""
            label="Phone"
            disabled={true}
            required
            value={
              '0' +
              values?.phone
                .replace(/ /g, '')
                .replace('+234', '')
                .replace(/^0+/, '')
                .replace(/\D/g, '')
            }
            onChangeText={handleChange('phone')}
            keyboardType="numeric"
          />
          <FormInput
            placeholder=""
            label="Email"
            required
            value={values?.email}
            onChangeText={handleChange('email')}
            // disabled={true}
          />
          {/* <FormInput
            placeholder=""
            label="Address"
            required
            onChangeText={handleChange('address')}
          /> */}
          <Spacer height={30} />
          <PrimaryButton
            isLoading={loading}
            text="Save"
            color={'white'}
            onPress={handleSubmit}
            backgroundColor={colors.mainColor}
          />
          {/* <View style={styles.btn}>
            <FormButton
              btnTitle="Save"
              loading={loading}
              onPress={handleSubmit}
            />
          </View> */}
        </KeyboardAwareScrollView>
      </ViewContainer>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  btn: {
    paddingTop: HP(2.67),
    width: '109%',
  },
  content: {
    // marginLeft: SIZES.width ,
    alignSelf: 'center',
    width: SIZES.width / 1,
    marginTop: 10,
    paddingHorizontal: 17,
    right: 12,
  },
});
