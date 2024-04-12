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
  RegularText,
  SemiBoldText,
  fontSize,
  lineHeight,
} from '../../utils/text';
import {useNavigation, useTheme} from '@react-navigation/native';
import Declut from '../../assets/images/declut.svg';
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
  fontFamily: font.regular,
});
const LoginScreen = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const {navigate} = useNavigation();
  const [login, {error, isLoading, data}] = useLoginMutation();
  const dispatch = useDispatch();
  const {setItem} = useAsyncStorage('@declut_user');
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
      email: '',
      phone: '',
      password:''
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
          dispatch(
            setCredential({
              user: response?.data?.user,
              access_token: response?.data?.authorisation?.token,
            }),
          );
          // navigate('RoutingRoute', {
          //   screen: 'BottomTabNavigation',
          // });
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
  console.log(values);
  console.log('====================================');

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <>
        <TopHeader
          title={'Sign In'}
          // borderBottom
          rightComponent={
            <Row onPress={() => navigate('register1')}>
              <SemiBoldText fontSize={fontSize.sm} color={colors.mainColor}>
                Sign up
              </SemiBoldText>
            </Row>
          }
        />

        <Spacer height={80} />
        <ViewContainer paddingHorizontal={21}>
          <DeclutContainer>
            <Row
              alignItems="center"
              flexDirection={isFocused || isFocused2 ? 'row' : 'column'}
              style={{right: isFocused || isFocused2 ? 89 : 0}}>
              <Declut />

              <Spacer height={30} />
              <HSpacer width={10} />
              <View>
                <SemiBoldText
                  textAlign="center"
                  lineHeight={lineHeight.sm}
                  color="black">
                  Welcome Back!
                </SemiBoldText>
                <RegularText color="black">Lets get you in</RegularText>
              </View>
            </Row>
          </DeclutContainer>

          <Spacer height={50} />

          <Input
            label="Phone *"
            inputContainerStyle={[
              styles.inputContainerStyle,
              isFocused && {
                borderColor: colors.mainColor,
                borderWidth: 1,
                borderBottomWidth: 1,
              },
              values.email && {
                backgroundColor: 'white',
                borderColor: colors.lightGrey,
                borderWidth: 1,
              },
            ]}
            // leftIcon={<Sms />}
            placeholder="Phone"
            labelStyle={[
              styles.labelStyle,
              isFocused && {color: colors.mainColor},
              values.email && {
                color: 'black',
              },
            ]}
            onChangeText={handleChange('phone')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            errorMessage={touched.email && errors.email}
            //   errorMessage='adlmladnn'
          />

          <View style={{marginLeft: SIZES.width / 50}}>
            <PasswordInputComponent
              label="Password *"
              color={'black'}
              containerStyle={[
                styles.inputContainerStyle,

                isFocused2 && {
                  borderColor: colors.mainColor,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  // left:113,
                },
                values.password && {
                  backgroundColor: 'white',
                  borderColor: colors.lightGrey,
                  borderWidth: 1,
                },
              ]}
              // leftIcon={<Sms />}
              placeholder="0000 000 0000"
              labelStyle={[
                styles.labelStyle,
                isFocused2 && {color: colors.mainColor},
              ]}
              onChangeText={handleChange('password')}
              setIsFocused={() => setIsFocused2(true)}
              setIsBlur={() => setIsFocused2(false)}
              bottomText={touched.password && errors.password}
              bottomTextOnError={false}
              inputError={true}

              //   bottomText='adlmladnn'
            />
            <ForgotContainer>
              <ForgotText>Forgot Password ?</ForgotText>
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
              values.phone_number && {
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
          <Spacer height={150} />

          <PrimaryButton
            isLoading={isLoading}
            text="Sign In"
            color={
              (values.email || values.phone_number) == ''
                ? colors.disabled
                : colors.white
            }
            onPress={handleSubmit}
            backgroundColor={
              (values.email || values.phone_number) == ''
                ? colors.grey
                : colors.mainColor
            }
            disabled={
              (values.email || values.phone_number || !isLoading) == '' && true
            }
          />
        </ViewContainer>
      </>
    </BaseView>
  );
};

export default LoginScreen;

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
  },
  labelStyle: {
    fontFamily: font.medium,
    fontWeight: '400',
    color: 'black',
    right: 5,
    fontSize: fontSize.sm + 2,
  },
});
