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
import {useNavigation, useTheme} from '@react-navigation/native';
import Declut from '../../assets/images/declut.svg';
import styled from '@emotion/native';
import {Input, fonts} from '@rneui/base';
import {wp} from '../../utils/general';
import {font} from '../../utils/theme/fonts';
import {useFormik} from 'formik';
import {PrimaryButton} from '../../component/view/button';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {NameValidtion} from './validation';
import Eclipese from '../../assets/images/ellipses.svg';

const DeclutContainer = styled.View({
  alignItems: 'center',
});

const IndicatorIcon = styled(Eclipese)({
  alignSelf: 'center',
});

const Register1 = () => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const {getItem, setItem} = useAsyncStorage('@declut_user_name');
  const {navigate, goBack} = useNavigation();

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
    },

    validationSchema: NameValidtion,

    onSubmit: () => {
      SaveUserName();
    },
  });

  const SaveUserName = () => {
    setItem(values.name);
    navigate('register2');
  };

  console.log('====================================');
  console.log(errors);
  console.log('====================================');
  return (
    <BaseView backgroundColor="#F9FAFB">
      <>
        <TopHeader
          title={'Create account'}
          // borderBottom
          rightComponent={
            <Row onPress={() => navigate('login')}>
              <SemiBoldText fontSize={fontSize.sm} color={colors.mainColor}>
                Sign in
              </SemiBoldText>
            </Row>
          }
        />

        <Spacer height={80} />
        <ScrollView>
          <ViewContainer paddingHorizontal={21}>
            <DeclutContainer>
              <Row
                flexDirection={isFocused ? 'row' : 'column'}
                alignItems="center">
                <Declut />
                <Spacer height={30} />
                <HSpacer />
                <SemiBoldText
                  textAlign={isFocused ? 'left' : 'center'}
                  lineHeight={lineHeight.sm}
                  color="black">
                  Lets get to know you and get your account {'\n'}created.
                </SemiBoldText>
              </Row>
            </DeclutContainer>
            {!isFocused && (
              <>
                <Spacer height={70} />
                <IndicatorIcon />
              </>
            )}
            <Spacer height={70} />
            <Input
              label="What is your name?"
              inputContainerStyle={[
                styles.inputContainerStyle,
                isFocused && {
                  borderColor: colors.mainColor,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                },
              ]}
              // leftIcon={<Sms />}
              placeholder="John Doe"
              labelStyle={[
                styles.labelStyle,
                isFocused && {color: colors.mainColor},
              ]}
              onChangeText={handleChange('name')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              errorMessage={errors.name}
              //   errorMessage='adlmladnn'
            />
            <Spacer height={180} />
            <PrimaryButton
              text="Continue"
              color={values.name == '' ? colors.disabled : colors.white}
              onPress={handleSubmit}
              backgroundColor={
                values.name == '' ? colors.grey : colors.mainColor
              }
              disabled={values.name == '' && true}
            />
          </ViewContainer>
        </ScrollView>
      </>
    </BaseView>
  );
};

export default Register1;

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
