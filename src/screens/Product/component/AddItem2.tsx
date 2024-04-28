import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../../../old/component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../old/component/FormButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ItemSchema2} from '../Validation';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DropDownSelect from '../../../old/component/DropDownSelect';
import ModalDropdown from '../../../old/component/ModalDropdown';
import {updateItemSuccess2} from '../../../../redux/product/api';
import {
  allFieldsFilled,
  COLOR,
  FontFamily,
  HP,
  WP,
} from '../../../old/Util/Util';
import {Spacer, ViewContainer} from '../../../component/view';
import {TopHeader} from '../../../component/view/headers/topHeader';
import {RFFontSize, SemiBoldText, fontSize} from '../../../utils/text';
import {SIZES} from '../../../utils/theme/theme';
import {AddItemHeader} from '../../../component/view/headers/AddItemHeader';
import {Input} from '@rneui/base';
import {
  InputContainerStyle,
  InputContainerStyle2,
  errorStyle,
  labelStyle,
} from '../../Auth/styling';
import {font} from '../../../utils/theme/fonts';
import {PrimaryButton} from '../../../component/view/button';

const data = [
  {id: 1, label: 'Electronice', value: '1'},
  {id: 2, label: 'Furniture', value: '2'},
  {id: 3, label: 'Sport & Outdoor', value: '3'},
  {id: 4, label: 'Babies & Kids', value: '4'},
  {id: 5, label: 'Pets', value: '5'},
  {id: 6, label: 'Antiques', value: '5'},
  {id: 7, label: 'Health & Beauty', value: '6'},
  {id: 8, label: 'KitchenWares', value: '7'},
  {id: 9, label: 'Office Supplies', value: '8'},
  {id: 10, label: 'Books & Supplies', value: '9'},
  {id: 11, label: 'Books & Media', value: '10'},
  {id: 12, label: 'Automobile', value: '11'},
  {id: 13, label: 'Garden', value: '12'},
  {id: 14, label: 'Musical Instrument', value: '13'},
  {id: 15, label: 'Toys & Games', value: '14'},
  {id: 16, label: 'Arts', value: '15'},
];

const DefectIMap = [
  {
    id: 1,
    title: 'Yes',
  },
  {
    id: 2,
    title: 'No',
  },
];

const AddItem2 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state.product?.item);
  const {colors} = useTheme();

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess2({
        category: values.categories,
        brand: values.brand,
      }),
    );
    navigation.navigate('Item3');
  };

  //  console.log(values.selectedId ,'v')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AddItemHeader
          borderBottom={true}
          title="Add Item"
          rightComponent={true}
          rightText="2/4"
          fullBorderWidth={true}
          borderBottom1
          borderBottom2
          // borderBottom3
          // borderBottom4
        />
        {/* <HeaderComponent
          rightComponent={true}
          title="Add Item"
          rightText={'2/4'}
          showStep={true}
          step1={true}
          step2={true}

          rightColor={COLOR.mainBlack}

        /> */}
      </View>
      <View style={styles.itemCon}>
        <SemiBoldText
          color={colors.secondaryBlack}
          fontSize={fontSize.md}
          marginTop={20}>
          Item Categorization
        </SemiBoldText>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 130}}>
        <Formik
          validationSchema={ItemSchema2}
          initialValues={{
            brand: '',
            categories: '',
          }}
          onSubmit={values => SetItemProduct(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
            touched,
          }) => (
            console.log(errors),
            
            <ViewContainer>
              <View style={{width: WP(90), marginTop: 20}}>
                <ModalDropdown
                  showLabel={true}
                  searchPlaceholder="Search Category"
                  data={data}
                  placeholder={'Select Category*'}
                  headerTitle={'Select Category *'}
                  onPress={e => setFieldValue('categories', e)}
                  componentTitle="Categories"
                  error={errors.categories}
                  backgroundColor={
                    !values.categories == '' &&
                    !errors.categories &&
                    COLOR.white
                  }
                  visible={visible1}
                  setVisible={setvisible1}
                />
              </View>

              <View style={styles.FormInput}>
                <Input
                  label="brand *"
                  inputContainerStyle={[
                    InputContainerStyle2,
                    isFocused && {
                      borderColor: colors.mainColor,
                      borderWidth: 1,
                      borderBottomWidth: 1,
                    },
                    values.brand && {
                      backgroundColor: 'white',
                      // borderColor: colors.lightGrey,
                      // borderWidth: 1,
                    },
                    errors.brand && touched.brand && errorStyle,
                  ]}
                  inputStyle={{
                    lineHeight: RFFontSize.sm + 0.5,
                    fontFamily: font.semiBold,
                    fontSize: RFFontSize.sm,
                  }}
                  // leftIcon={<Sms />}
                  placeholder="brand"
                  labelStyle={[
                    labelStyle,
                    {
                      paddingTop: 3,
                    },
                    // isFocused && {color: colors.mainColor},
                    values.brand && {
                      color: 'black',
                    },
                  ]}
                  onChangeText={handleChange('brand')}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  errorMessage={touched.brand && errors.brand}
                  //   errorMessage='adlmladnn'
                />
              </View>

              <Spacer height={10}/>
              <View>
                <PrimaryButton
                  text="Next"
                  backgroundColor={
                    !allFieldsFilled(values)
                      ? "#F2F4F7"
                      : COLOR.mainColor
                  }
                  color={
                    !allFieldsFilled(values) ? "#98A2B3" : COLOR.white
                  }
                  onPress={handleSubmit}
                />
              </View>
            </ViewContainer>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItem2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // alignSelf:'center',
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
    // paddingLeft: WP(5),
    // marginTop: HP(-3),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.0,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.lightBlue,
    width: '95%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  },
  FormInput: {
    // paddingTop: HP(1),
    // paddingBottom: 50,
    // width: '104%',
  },
  title: {
    marginTop: 7,
    color: COLOR.black,
  },
  header: {
    // marginTop: HP(1),
    // paddingHorizontal: 10,
    // height: HP(8),
    // marginLeft:WP(3),
    // width:WP(70)
  },
  text: {
    color: COLOR.black,
  },
  btn: {
    paddingTop: HP(39),
    width: WP(100),
  },
  itemCon: {
    marginLeft: SIZES.width / 15,
    // marginTop:30
  },
  item: {
    fontSize: WP(4.5),
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    marginLeft: WP(1.7),
    paddingBottom: 20,
  },
});
