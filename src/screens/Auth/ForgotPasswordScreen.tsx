import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ForgotPasswordImage from '../../assets/images/forgot.svg';
import {BaseView, Spacer, ViewContainer} from '../../component/view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {color} from '@rneui/base';
import {TopHeader} from '../../component/view/headers/topHeader';
import styled from '@emotion/native';
import {Input} from '@rneui/themed';
import {InputContainerStyle} from './styling';
import {useFormik} from 'formik';
import {RFFontSize, fontSize} from '../../utils/text';
import {font} from '../../utils/theme/fonts';
import {PrimaryButton} from '../../component/view/button';
import {ForgotPasswordValidation} from './validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForgotPasswordApiMutation} from '../../../redux/auth/api';
import {AlertNofity, AlertNofityError} from '../../utils/notify';

const ImageContainer = styled.View({
  alignSelf: 'center',
});
const ForgotPasswordScreen = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const [isFocused, setIsFocused] = React.useState(false);

  const [forgotPasswordApi, {isLoading}] = useForgotPasswordApiMutation();

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
    },

    validationSchema: ForgotPasswordValidation,

    onSubmit: () => {
      ForgotPasswordAction();
    },
  });

  const ForgotPasswordAction = () => {
    forgotPasswordApi({
      email: values.email,
    })
      .unwrap()
      .then(response => {
        if (response?.code == 200) {
          AlertNofity('Success', 'Check your email for the otp code.');
          navigate('otp');
        }
        console.log(response, 'response');
      })
      .catch(err => {
        AlertNofityError('Error', 'Check your internet connection!');
      });
  };

  console.log(values.email)
  return (
    <BaseView color={colors.bgColor}>
      <TopHeader
        title={'Forgot Password'}
        rightComponent={true}
        rightText="Sign in"
        onPress={() => navigate('login')}
      />
      <Spacer height={50} />
      <KeyboardAwareScrollView>
        <ImageContainer>
          <ForgotPasswordImage />
        </ImageContainer>

        <Spacer height={70} />
        <>
          <ViewContainer>
            <Input
              label="Enter your email to reset your password"
              inputContainerStyle={[
                InputContainerStyle,
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
                errors.email && {
                  borderColor: 'red',
                  borderWidth: 1,
                  borderBottomWidth: 1,
                },
              ]}
              inputStyle={{
                lineHeight: RFFontSize.sm + 0.5,
                fontFamily: font.semiBold,
                fontSize: RFFontSize.sm,
              }}
              // leftIcon={<Sms />}
              placeholder="Email"
              labelStyle={[
                styles.labelStyle,

                isFocused && {color: colors.mainColor},
                values.email && {
                  color: 'black',
                },
                errors.email && {
                  color: 'red',
                },
              ]}
              onChangeText={handleChange('email')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              errorMessage={touched.email && errors.email}
              //   errorMessage='adlmladnn'
            />

            <Spacer height={120} />

            <PrimaryButton
              text="Continue"
              isLoading={isLoading}
              color={values.email == '' ? colors.disabled : colors.white}
              onPress={handleSubmit}
              backgroundColor={
                values.email == '' ? colors.grey : colors.mainColor
              }
              disabled={values.email == '' && true}
            />
          </ViewContainer>
        </>
      </KeyboardAwareScrollView>
    </BaseView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: font.bold,
    // fontWeight: 'bold',
    color: 'black',
    right: 5,
    fontSize: fontSize.sm + 2,
    paddingBottom: 5,
  },
});
