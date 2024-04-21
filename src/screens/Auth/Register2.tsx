import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {TopHeader} from '../../component/view/headers/topHeader';
import {RFFontSize, SemiBoldText, fontSize, lineHeight} from '../../utils/text';
import {useNavigation, useTheme} from '@react-navigation/native';
import Declut from '../../assets/images/declut.svg';
import styled from '@emotion/native';
import {Input, fonts} from '@rneui/base';
import {wp} from '../../utils/general';
import {font} from '../../utils/theme/fonts';
import {useFormik} from 'formik';
import {PrimaryButton} from '../../component/view/button';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {EmailandPhoneSchema, NameValidtion} from './validation';
import Eclipese from '../../assets/images/ellipses2.svg';

const DeclutContainer = styled.View({
  alignItems: 'center',
});
const IndicatorIcon = styled(Eclipese)({
  alignSelf: 'center',
});

const Register2 = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const {getItem, setItem} = useAsyncStorage('@declut_user_name');
  const {navigate} = useNavigation();

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
      phone_number: '',
    },

    validationSchema: EmailandPhoneSchema,

    onSubmit: () => {
      AuthNavigation();
    },
  });

  const AuthNavigation = () => {
    navigate('createPassword', {
      email: values.email,
      phone: values.phone_number
        .replace(/ /g, '')
        .replace('+234', '')
        .replace(/^0+/, '')
        .replace(/\D/g, ''),
    });
  };

  console.log(errors,'error');
  
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <>
        <TopHeader
          title={'Create account'}
          // borderBottom
          rightComponent={true}
          rightText='Sign in'

          onPress={() => navigate('login')}
        />

        <Spacer height={80} />
        <ViewContainer paddingHorizontal={21}>
          <DeclutContainer>
            <Row
              alignItems="center"
              flexDirection={isFocused || isFocused2 ? 'row' : 'column'}
              style={{right: isFocused || isFocused2 ? 25 : 0}}>
              <Declut />

              <Spacer height={30} />
              <HSpacer width={10} />
              <SemiBoldText
                textAlign="center"
                fontSize={lineHeight.sm}
                color="black">
                We will never spam you.
              </SemiBoldText>
            </Row>
          </DeclutContainer>
          {!isFocused && !isFocused2 && (
            <>
              <Spacer height={50} />
              <IndicatorIcon />
            </>
          )}
          <Spacer height={50} />

          <Input
            label="Email *"
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
            ]}
            onChangeText={handleChange('email')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            errorMessage={touched.email && errors.email}
            //   errorMessage='adlmladnn'
          />

          <Input
            label="Phone Number *"
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
            inputStyle={{
              lineHeight: RFFontSize.sm + 0.5,
              fontFamily: font.semiBold,
              fontSize: RFFontSize.sm,
            }}
            // leftIcon={<Sms />}
            placeholder="0000 000 0000"
            labelStyle={[
              styles.labelStyle,
              isFocused2 && {color: colors.mainColor},
            ]}
            onChangeText={handleChange('phone_number')}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
            errorMessage={errors.phone}
            //   errorMessage='adlmladnn'
          />
          <Spacer height={100} />

          <PrimaryButton
            text="Continue"
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
            disabled={(values.email || values.phone_number) == '' && true}
          />
        </ViewContainer>
      </>
    </BaseView>
  );
};

export default Register2;

const styles = StyleSheet.create({
  inputContainerStyle: {
    alignItems: 'flex-start',
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
