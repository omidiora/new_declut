import {Platform, StyleSheet, Text, View} from 'react-native';
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

const EditProfile = () => {
  const {getItem} = useAsyncStorage('@declut');
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState({});
  // const userDetail = useSelector(state => state?.auth?.user);
  const phoneInput = React.useRef<PhoneInput>(null);

  const [details, setDetails] = React.useState(userDetail);

  const retrieveStoredDetail = async () => {
    const json = await getItem();
    console.log(json, 'd');
    const user_data = json != null ? JSON.parse(json) : {};
    console.log(user_data,'aajbdjabjdfb')
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
    dispatch(
      editProfileApi({
        name: values?.name,
        email: values?.email,
        phone_number: values?.phone_number,
        id: userDetail?.id,
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

  console.log('====================================');
  console.log(userDetail, 'values');
  console.log('====================================');
  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
     <View style={{marginLeft:5}}>
     <HeaderComponent2 title={'Account Details'}  />
     </View>
      <ViewContainer>
        <KeyboardAwareScrollView style={styles.content}>
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
            disabled={true}
          />
          <FormInput
            placeholder=""
            label="Address"
            required
            onChangeText={handleChange('address')}
          />
          <View style={styles.btn}>
            <FormButton btnTitle="Save" onPress={handleSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </ViewContainer>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  btn: {
    paddingTop: HP(2.67),
    width:'109%'
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
