import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

const DeclutContainer = styled.View({
  alignItems: 'center',
});

const CreatePassword = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const {getItem, setItem} = useAsyncStorage('@declut_user_name');
  const {navigate} = useNavigation();
  const {register} = useRegisterMutation();
  const [isVisble, setisVisble] = React.useState(false);
  const route = useRoute();

  console.log('route');

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

    onSubmit: () => {},
  });

  const RegisterFunction = values => {
    register({
      name: name,
      phone_number: `+234${params.phone}`,
      email: route.params.email,
      password: values.password,
      avatar: '',
    })
      .unwrap()
      .then(response => {
        console.log(response, 'response create the totla user');
        if (response?.code == 409) {
          AlertNofityError('Error', 'Email and Phone  is already Used');
        } else {
          // LocalStorage.set('userId', response?.data?.id);
          // navigate('Otp', {
          //   phone: route.params.phone_number,
          // });
        }
      })
      .catch(err => {
        console.log(err, 'error from reg');
        AlertNofityError('Error', 'Something Went Wrong!!');
      });
  };
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <>
        <View style={{height: 40}}>
          <TopHeader
            title={'Security'}
            // borderBottom
            rightComponent={
              <Row
                onPress={() =>
                  navigate('PaymentsNavigation', {screen: 'CreatePaymentLink'})
                }>
                <SemiBoldText fontSize={fontSize.sm} color={colors.mainColor}>
                  Sign in
                </SemiBoldText>
              </Row>
            }
          />
        </View>
        <Spacer height={80} />

        <KeyboardAwareScrollView contentContainerStyle={{zIndex: 100}}>
          <ViewContainer paddingHorizontal={30}>
            <DeclutContainer>
              <Row
                alignItems="center"
                flexDirection={isFocused || isFocused2 ? 'row' : 'column'}
                style={{right: isFocused || isFocused2 ? 0 : 0, zIndex: 100}}>
                <Declut />

                <Spacer height={20} />
                <HSpacer />
                {isFocused || (isFocused2 && <HSpacer width={10} />)}
                <SemiBoldText
                  textAlign={isFocused || isFocused2 ? 'left' : 'center'}
                  lineHeight={lineHeight.sm}
                  color="black">
                  Lets get your account secured. This is the {'\n'} last step,
                  we promise.
                </SemiBoldText>
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
              placeholder="Email"
              labelStyle={[
                styles.labelStyle,
                isFocused && {color: colors.mainColor},
                values.password && {
                  color: 'black',
                },
              ]}
              onChangeText={handleChange('password')}
              bottomText={touched.password && errors.password}
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
              ]}
              // leftIcon={<Sms />}
              placeholder="0000 000 0000"
              labelStyle={[
                styles.labelStyle,
                isFocused2 && {color: colors.mainColor},
              ]}
              onChangeText={handleChange('confirmPassword')}
              setIsFocused={() => setIsFocused2(true)}
              setIsBlur={() => setIsFocused2(false)}
              bottomText={touched.confirmPassword && errors.confirmPassword}
              bottomTextOnError={false}
              inputError={true}

              //   bottomText='adlmladnn'
            />
            <Spacer height={130} />

            <PrimaryButton
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
