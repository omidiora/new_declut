import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {TopHeader} from '../../component/view/headers/topHeader';
import {
  RFFontSize,
  RegularText,
  SemiBoldText,
  fontSize,
  lineHeight,
} from '../../utils/text';
import {useNavigation, useTheme} from '@react-navigation/native';
import Declut from '../../assets/images/declut.svg';
import SmallDeclut from '../../assets/images/smallBg.svg';
import styled from '@emotion/native';
import {Input, fonts} from '@rneui/base';
import {wp} from '../../utils/general';
import {font} from '../../utils/theme/fonts';
import {useFormik} from 'formik';
import {PrimaryButton} from '../../component/view/button';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {EmailandPhoneSchema, LoginSchema, NameValidtion} from './validation';
import Eclipese from '../../assets/images/ellipses2.svg';
import {PasswordInputComponent} from '../../component/view/passwordInput';
import {SIZES} from '../../utils/theme/theme';
import {useLoginMutation} from '../../../redux/auth/api';
import {useDispatch} from 'react-redux';
import {AlertNofityError} from '../../utils/notify';
import {setCredential} from '../../../redux/auth';
import {SearchBar} from '@rneui/themed';
import {errorStyle, labelStyle} from './styling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const DeclutContainer = styled.View({
  alignItems: 'center',
});

const ForgotContainer = styled.TouchableOpacity({
  position: 'absolute',
  zIndex: 100,
  left: wp(50),
});

const ForgotText = styled.Text({
  color: '#02A89E',
  fontSize: fontSize.md,
  fontFamily: font.semiBold,
});
const LoginScreen = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const {navigate} = useNavigation();
  const [login, {error, isLoading, data}] = useLoginMutation();
  const dispatch = useDispatch();
  const {setItem} = useAsyncStorage('@declut_user');
  const {setItem: setUserDetails} = useAsyncStorage('@declut');
  const {setItem: setUserHasAccount} = useAsyncStorage('@has_user_account');
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
      phone: '',
      password: '',
    },

    validationSchema: LoginSchema,

    onSubmit: () => {
      UserLogin();
    },
  });

  const UserLogin = () => {
    login({
      phone_number: `+234${values.phone
        .replace(/ /g, '')
        .replace('+234', '')
        .replace(/^0+/, '')
        .replace(/\D/g, '')}`,
      password: values.password,
    })
      .unwrap()
      .then(response => {
        console.log(response, 'response');
        if (response.code == 200) {
          setItem(response?.data?.authorisation?.token);
          setUserDetails(JSON.stringify(response?.data?.user));
          setUserHasAccount(JSON.stringify(response?.data?.has_account));
          dispatch(
            setCredential({
              user: response?.data?.user,
              access_token: response?.data?.authorisation?.token,
            }),
          );
          navigate('BottomTabNavigation');
        } else {
          AlertNofityError('Login Failed', 'Incorrect Login Detail');
        }
      })
      .catch(err => {
        console.log(err, 'ere');
        AlertNofityError('Login Failed', 'Check Your Internet Connection!');
      });
  };

  console.log(errors, 'error');

  console.log('====================================');
  console.log(isFocused2, 'isFocused2 ');
  console.log('====================================');

  return (
    <BaseView backgroundColor={colors.bgColor} focusBarStyle={'dark-content'}>
      <>
        <TopHeader
          title={'Sign In'}
          // borderBottom
          rightComponent={true}
          rightText="Sign  Up"
          onPress={() => navigate('register1')}
        />

        <Spacer height={80} />
        <KeyboardAwareScrollView>
          <ViewContainer paddingHorizontal={21}>
            <DeclutContainer>
              <Row
                alignItems="center"
                flexDirection={isFocused || isFocused2 ? 'row' : 'column'}
                style={{right: isFocused || isFocused2 ? 80 : 0}}>
                {/* */}
                {isFocused || isFocused2 ? <SmallDeclut /> : <Declut />}

                <Spacer height={40} />
                <HSpacer width={10} />
                <View>
                  <SemiBoldText
                    textAlign="center"
                    fontSize={fontSize.sm + 4}
                    color="#101828">
                    Welcome Back!
                  </SemiBoldText>
                  <View style={{right: isFocused || isFocused2 ? 10 : 0}}>
                    <RegularText
                      fontSize={fontSize.sm + 2}
                      color="black"
                      textAlign="center">
                      Let's get you in
                    </RegularText>
                  </View>
                </View>
              </Row>
            </DeclutContainer>

            <Spacer height={50} />

            <Input
              keyboardType="numeric"
              label="Phone *"
              style={{fontSize: 12}}
              inputContainerStyle={[
                styles.inputContainerStyle,
                isFocused && {
                  borderColor: colors.mainColor,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                },
                values.phone && {
                  backgroundColor: 'white',
                  // borderColor: colors.lightGrey,
                  // borderWidth: 1,
                },
                errors.phone && errorStyle,
              ]}
              inputStyle={{
                lineHeight: RFFontSize.sm + 0.5,
                fontFamily: font.semiBold,
                fontSize: RFFontSize.sm,
              }}
              // leftIcon={<Sms />}
              placeholder="Phone"
              labelStyle={[
                labelStyle,
                {
                  paddingTop: 3,
                },
                isFocused && {color: colors.mainColor},
                values.phone && {
                  color: 'black',
                },
              ]}
              onChangeText={handleChange('phone')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              errorMessage={errors.phone}
              //   errorMessage='adlmladnn'
            />

            {errors.phone && <Spacer />}
            <View style={{marginLeft: SIZES.width / 50}}>
              <PasswordInputComponent
                label="Password *"
                style={{
                  fontSize: fontSize.sm,
                  fontFamily: font.semiBold,
                  lineHeight: RFFontSize.sm + 0.5,
                  opacity: 0.8,
                }}
                containerStyle={[
                  styles.inputContainerStyle,
                  {
                    // borderBottomWidth: 0.5,
                  },

                  errors.phone && errorStyle,
                  isFocused2 && {
                    borderColor: colors.mainColor,
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    // left:113,
                  },
                  values.password && {
                    backgroundColor: 'white',
                    // borderColor: colors.lightGrey,
                    // borderWidth: 1,
                  },
                ]}
                // leftIcon={<Sms />}
                placeholder="Password"
                labelStyle={[
                  labelStyle,
                  isFocused2 && {color: colors.mainColor},
                ]}
                onChangeText={handleChange('password')}
                setIsFocused={() => setIsFocused2(true)}
                setIsBlur={() => setIsFocused2(false)}
                bottomText={errors.password}
                bottomTextOnError={false}
                inputError={true}

                //   bottomText='adlmladnn'
              />
              <ForgotContainer onPress={() => navigate('forgotPassword')}>
                <ForgotText>Forgot Password?</ForgotText>
              </ForgotContainer>
            </View>

            {/* <Input
            label="Password  *"
            inputContainerStyle={[
              styles.inputContainerStyle,
              isFocused2 && {
                borderColor: colors.mainColor,
                borderWidth: 1,
                borderBottomWidth: 1,
              },
              values.phone && {
                backgroundColor: 'white',
                borderColor: colors.lightGrey,
                borderWidth: 1,
              },
            ]}
            // leftIcon={<Sms />}
            placeholder="****************"
            labelStyle={[
              styles.labelStyle,
              isFocused2 && {color: colors.mainColor},
            ]}
            onChangeText={handleChange('phone_number')}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
            errorMessage={errors.phone}
            //   errorMessage='adlmladnn'
          /> */}
            {errors.phone ? <Spacer height={20} /> : <Spacer height={10} />}

            <PrimaryButton
              isLoading={isLoading}
              text="Sign In"
              color={
                (values.password || values.phone) == ''
                  ? colors.disabled
                  : colors.white
              }
              onPress={handleSubmit}
              backgroundColor={
                (values.password || values.phone) == ''
                  ? colors.grey
                  : colors.mainColor
              }
              disabled={
                (!values.password || !values.phone || isLoading == true) && true
              }
            />
          </ViewContainer>
        </KeyboardAwareScrollView>
      </>
    </BaseView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainerStyle: {
    // alignItems: 'flex-start',
    // borderBottomWidth: 0,
    borderBottomColor: 'lightgrey',
    borderWidth: 0,
    padding: 6,
    borderRadius: 10,
    width: wp(90),
    marginLeft: -10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    backgroundColor: '#E4E7EC',
    fontFamily: font.medium,
  },
  labelStyle: {
    fontFamily: font.medium,
    fontWeight: '400',
    color: 'black',
    right: 5,
    fontSize: fontSize.sm + 2,
  },
});
