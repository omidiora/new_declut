import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../../old/component/HeaderComponent';

import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {ItemSchema1} from '../Validation';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useTheme} from '@react-navigation/native';

import AuthNavigation from '../../../navigation/AuthNavigation';
import Pricing from '../../../assets/images/pricing.svg';
import {
  allFieldsFilled,
  COLOR,
  FontFamily,
  HP,
  WP,
} from '../../../old/Util/Util';
import {updateItemSuccess4} from '../../../../redux/product/api';
import FormButton from '../../../old/component/FormButton';
import FormInput from '../../../old/component/FormInput';
import {Spacer, ViewContainer} from '../../../component/view';
import {wp} from '../../../utils/general';
import {RFFontSize, SemiBoldText} from '../../../utils/text';
import {font} from '../../../utils/theme/fonts';
import {errorStyle, InputContainerStyle2, labelStyle} from '../../Auth/styling';
import {Input} from '@rneui/base';
import Naira from '../../../assets/images/naira.svg';
import {PrimaryButton} from '../../../component/view/button';
import { AddItemHeader } from '../../../component/view/headers/AddItemHeader';

const data = [
  {label: 'Neatly Used (Old)', value: 'Neatly Used'},
  {label: 'New', value: 'New'},
];

const EditItem4 = () => {
  const [discountPice, setDiscountPice] = React.useState<number>(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state?.product);
  const {colors} = useTheme();
  const CreateItemFunction = async values => {
    dispatch(
      updateItemSuccess4({
        price: values?.price,
      }),
    );
    navigation.navigate('UploadAllItem');
  };

  const Eightpercentage = (num: number) => {
    let value = ((8 / 100) * num).toFixed(1);
    setDiscountPice(num - Number(value));
    return value;
  };

  console.log('====================================');
  console.log(discountPice, 'discountPice');
  console.log('====================================');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <AddItemHeader
          borderBottom={true}
          title="Add Item"
          rightComponent={true}
          rightText="4/4"
          fullBorderWidth={true}
          borderBottom1
          borderBottom2
          borderBottom3
          borderBottom4
        />
        {/* <HeaderComponent
          rightComponent={true}
          title="Add Item"
          rightText={'4/4'}
          showStep={true}
          step1={true}
          step2={true}
          step3={true}
          step4={true}
          rightColor={COLOR.mainBlack}
        /> */}
      </View>
      <KeyboardAwareScrollView
        stickyHeaderIndices={[1]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{paddingBottom: 13}}>
        <View style={styles.subContainer}>
          <Spacer height={35}/>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <SemiBoldText color={colors.secondaryBlack} fontSize={16}>
              Pricing
            </SemiBoldText>
          </View>
          <View style={{marginLeft: 20}}>
            <Pricing width={WP(90)} height={HP(20)} />
          </View>
          <Formik
            // validationSchema={ItemSchema1}
            initialValues={{
              price: '',
            }}
            onSubmit={values => CreateItemFunction(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              touched,
            }) => (
              <View style={styles.formInput}>
                <ViewContainer>
                  <Input
                    label="Enter price *"
                    inputContainerStyle={[
                      InputContainerStyle2,
                      // isFocused && {
                      //   borderColor: colors.mainColor,
                      //   borderWidth: 1,
                      //   borderBottomWidth: 1,
                      // },
                      values.price && {
                        backgroundColor: 'white',
                        // borderColor: colors.lightGrey,
                        // borderWidth: 1,
                      },
                      errors.price && errorStyle,
                    ]}
                    inputStyle={{
                      lineHeight: RFFontSize.sm + 0.5,
                      fontFamily: font.semiBold,
                      fontSize: RFFontSize.sm,
                      marginTop: 2,
                    }}
                    leftIcon={<Naira />}
                    // leftIcon={<Sms />}
                    placeholder="Price"
                    labelStyle={[
                      labelStyle,
                      {
                        paddingTop: 3,
                      },
                      // isFocused && {color: colors.mainColor},
                      values.price && {
                        color: 'black',
                      },
                    ]}
                    onChangeText={handleChange('price')}
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                    errorMessage={touched.price && errors.price}
                    //   errorMessage='adlmladnn'
                  />

                  {/* <FormInput
                    value={values.price}
                    label="Enter price *"
                    placeholder="Enter 2500 *"
                    onChangeText={handleChange('price')}
                    handleBlur={Eightpercentage(values.price)}
                    backgroundColor={
                      !values.price == '' && !errors.price && COLOR.white
                    }
                  /> */}

                  <Input
                    label="You’ll get"
                    value={String(discountPice)}
                    disabled={true}
                    inputContainerStyle={[
                      InputContainerStyle2,
                      // isFocused && {
                      //   borderColor: colors.mainColor,
                      //   borderWidth: 1,
                      //   borderBottomWidth: 1,
                      // },
                      values.price && {
                        backgroundColor: 'white',
                        // borderColor: colors.lightGrey,
                        // borderWidth: 1,
                      },
                      errors.price && errorStyle,
                    ]}
                    handleBlur={Eightpercentage(values.price)}
                    inputStyle={{
                      lineHeight: RFFontSize.sm + 0.5,
                      fontFamily: font.semiBold,
                      fontSize: RFFontSize.sm,
                      marginTop: 2,
                    }}
                    leftIcon={<Naira />}
                    // leftIcon={<Sms />}
                    placeholder="Price"
                    labelStyle={[
                      labelStyle,
                      {
                        paddingTop: 3,
                      },
                      // isFocused && {color: colors.mainColor},
                      values.price && {
                        color: 'black',
                      },
                    ]}
                    // onChangeText={handleChange('price')}
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                    // errorMessage={touched.price && errors.price}
                    //   errorMessage='adlmladnn'
                  />

                  <Spacer height={250} />
                  <PrimaryButton
                    text="Next"
                    backgroundColor={
                      !allFieldsFilled(values) ? '#F2F4F7' : COLOR.mainColor
                    }
                    color={!allFieldsFilled(values) ? '#98A2B3' : COLOR.white}
                    onPress={handleSubmit}
                  />
                </ViewContainer>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditItem4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  addItem: {
    color: COLOR.black,
    fontWeight: 'bold',
    paddingBottom: HP(4),
  },
  headerComponent: {
    // paddingLeft:-100
  },
  subContainer: {
    // paddingLeft: WP(3),
    width: WP(104),
  },
  dropdown: {
    height: 50,
    borderColor: 'grey',

    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#E4E7EC',
    width: '90%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    paddingBottom: 10,
    color: COLOR.black,
    // position: 'absolute',
    // backgroundColor: 'white',
    // left: 22,
    // top: 8,
    // zIndex: 999,
    // paddingHorizontal: 8,
    // fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
  },
  btn: {
    marginTop: HP(30),

    width: '100%',
    marginLeft: 18,
  },
  dropItem: {
    paddingTop: HP(3),
  },
  conditionError: {
    color: 'red',
  },
  header: {
    // marginTop: HP(3),
    width: '90%',
    marginLeft: 20,
  },
  basicInfo: {
    fontSize: WP(4.5),
    //  fontWeight:'bold',
    color: '#344054',
    fontFamily: FontFamily.bold,
  },
  formInput: {
    marginTop: HP(-3),
    // marginLeft:wp(-3),
    width: '96%',
  },
});
