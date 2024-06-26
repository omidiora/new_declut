import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {TopHeader} from '../../component/view/headers/topHeader';
import {SemiBoldText, fontSize, lineHeight} from '../../utils/text';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import Declut from '../../assets/images/declut.svg';
import styled from '@emotion/native';
import {Input, fonts} from '@rneui/base';
import {wp} from '../../utils/general';
import {font} from '../../utils/theme/fonts';
import {useFormik} from 'formik';
import {PrimaryButton} from '../../component/view/button';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {EmailandPhoneSchema, NameValidtion, PasswordSchema} from './validation';
import {PasswordInputComponent} from '../../component/view/passwordInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRegisterMutation} from '../../../redux/auth/api';
import SuccessRegisterModal from '../../component/view/SuccessRegisterModal ';
import {AlertNofityError} from '../../utils/notify';
import { errorStyle } from './styling';
import SmallDeclut from '../../assets/images/smallBg.svg';


const DeclutContainer = styled.View({
  alignItems: 'center',
});

const CreatePassword = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const {getItem, setItem} = useAsyncStorage('@declut_user_name');
  const {navigate} = useNavigation();
  const [register, {isLoading}] = useRegisterMutation();
  const [isVisble, setisVisble] = React.useState(false);
  const route = useRoute();

  const [detail, setDetail] = useState('');

  const getUserDetails = async () => {
    const item = await getItem();
    setDetail(item);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
    touched,
  } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validationSchema: PasswordSchema,

    onSubmit: () => {
      RegisterFunction();
    },
  });

  const RegisterFunction = () => {
    register({
      name: detail,
      phone_number: `+234${route.params.phone}`,
      email: route.params.email,
      password: values?.password,
      avatar: ' ',
    })
      .unwrap()
      .then(response => {
        console.log(response, 'response create the totla user');
        if (response?.code == 409) {
          AlertNofityError('Error', 'Email and Phone  is already Used');
        } else if (response.code == 201 || response.code == 200) {
          // LocalStorage.set('userId', response?.data?.id);
          navigate('otp', {
            phone: `+234${route.params.phone}`,
            user: response.data,
          });
        }
      })
      .catch(err => {
        console.log(err, 'error from reg');
        AlertNofityError('Error', 'Something Went Wrong!!');
      });
  };

  console.log('====================================');
  console.log(values?.password, '1');
  console.log('====================================');
  return (
    <BaseView backgroundColor={colors.bgColor} focusBarStyle={'dark-content'}>
      <>
        <View style={{height: 40}}>
          <TopHeader
            title={'Security'}
            // borderBottom
            
            rightComponent={true}
            rightText='Sign In'
            onPress={() => navigate('login')}
          />
        </View>
        <Spacer height={80} />

        <KeyboardAwareScrollView contentContainerStyle={{zIndex: 100}}>
          <ViewContainer paddingHorizontal={30}>
            <DeclutContainer>
              <Row
                alignItems="center"
                flexDirection={isFocused || isFocused2 ? 'row' : 'column'}
                style={{left: isFocused || isFocused2 ? 12 : 0, zIndex: 100}}>
             {isFocused || isFocused2 ?<SmallDeclut/>:    <Declut />}

                <Spacer height={30} />
                {/* <HSpacer /> */}
                {isFocused || (isFocused2 && <HSpacer  />)}
               <ViewContainer>
               <SemiBoldText
                  textAlign={isFocused || isFocused2 ? 'left' : 'center'}
                  fontSize={lineHeight.sm}
                  color="black">
                  Lets get your account secured. This is the last
                  step, We promise.
                </SemiBoldText>
               </ViewContainer>
              </Row>
            </DeclutContainer>
            <Spacer height={70} />
            <PasswordInputComponent
              label="Password *"
              color={'black'}
              setIsFocused={() => setIsFocused(true)}
              setIsBlur={() => setIsFocused(false)}
              containerStyle={[
                styles.inputContainerStyle,
                isFocused && {
                  borderColor: colors.mainColor,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                },
                values.password && {
                  backgroundColor: 'white',
                  borderColor: colors.lightGrey,
                  borderWidth: 1,
                },
               

              ]}
              // leftIcon={<Sms />}
              placeholder="Password"
              labelStyle={[
                styles.labelStyle,
                isFocused && {color: colors.mainColor},
              
                values.password && {
                  color: 'black',
                },
                errors.password&&{color:"red"}
              ]}
              onChangeText={handleChange('password')}
              bottomText={errors.password}
              bottomTextOnError={false}
              inputError={true}
            />

            <Spacer />
            <PasswordInputComponent
              label="Confirm Password *"
              color={'black'}
              containerStyle={[
                styles.inputContainerStyle,
                isFocused2 && {
                  borderColor: colors.mainColor,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                },
                values.confirmPassword && {
                  backgroundColor: 'white',
                  borderColor: colors.lightGrey,
                  borderWidth: 1,
                },
                errors.confirmPassword && errorStyle,
              ]}
              // leftIcon={<Sms />}
              placeholder="Confirm Password"
              labelStyle={[
                styles.labelStyle,
                isFocused2 && {color: colors.mainColor},
                errors.confirmPassword&&{color:"red"}
              ]}
              onChangeText={handleChange('confirmPassword')}
              setIsFocused={() => setIsFocused2(true)}
              setIsBlur={() => setIsFocused2(false)}
              bottomText={ errors.confirmPassword}
              bottomTextOnError={false}
              inputError={true}

              //   bottomText='adlmladnn'
            />
          {errors.confirmPassword &&  <Spacer height={5}/>}

            <PrimaryButton
            style={{width:'104%',alignSelf:'center',marginTop:20}}
              text="Complete Sign Up"
              color={
                (values.password || values.confirmPassword) == ''
                  ? colors.disabled
                  : colors.white
              }
              onPress={handleSubmit}
              backgroundColor={
                (values.password || values.confirmPassword) == ''
                  ? colors.grey
                  : colors.mainColor
              }
              disabled={
                (values.password || values.confirmPassword) == '' && true
              }
              isLoading={isLoading}
            />
          </ViewContainer>
        </KeyboardAwareScrollView>
      </>
    </BaseView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  inputContainerStyle: {
    // alignItems: 'flex-start',
    // borderBottomWidth: 0,
    borderBottomColor: 'red',
    borderWidth: 0,
    padding: 6,
    borderRadius: 10,
    width: wp(90),
    marginLeft: -10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    backgroundColor: '#E4E7EC',
    color: 'black',
  },
  labelStyle: {
    fontFamily: font.medium,
    fontWeight: '400',
    color: 'black',
    fontSize: fontSize.sm + 2,
  },
});
