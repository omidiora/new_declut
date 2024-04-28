import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Formik, useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {ItemSchema1} from '../Validation';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {getAllState, getLgaById} from '../../../redux/location/api';
import HeaderComponent from '../../../old/component/HeaderComponent';
import ModalDropdown from '../../../old/component/ModalDropdown';
import ConditionItemDropdown from '../../../old/component/ConditionItemDropdown';
import ConditionItem from '../../../old/component/ConditionItem';
import {updateItemSuccess} from '../../../../redux/product/api';
import {getAllState, getLgaById} from '../../../../redux/location/api';
import FormButton from '../../../old/component/FormButton';
import FormInput from '../../../old/component/FormInput';
import {
  FontFamily,
  COLOR,
  HP,
  WP,
  allFieldsFilled,
} from '../../../old/Util/Util';
import {TopHeader} from '../../../component/view/headers/topHeader';
import {RFFontSize, SemiBoldText, fontSize} from '../../../utils/text';
import {colors} from 'react-native-elements';
import {BaseView, Spacer, ViewContainer} from '../../../component/view';
import {AddItemHeader} from '../../../component/view/headers/AddItemHeader';
import {Input} from '@rneui/base';
import {
  ErrorColor,
  FocusedInput,
  InputContainerStyle,
  InputContainerStyle2,
  MainColor,
  errorStyle,
  inputStyle,
  labelStyle,
  valueFilledUnFocused,
} from '../../Auth/styling';
import {font} from '../../../utils/theme/fonts';
import {ModalViewArrow, SelectionViewInput} from '../styling';
import {PrimaryButton} from '../../../component/view/button';
const data = [
  {label: 'Neatly Used', value: 'Neatly Used'},
  {label: 'New', value: 'New'},
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

const AddItem1 = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const AllState = useSelector(state => state.location?.data);
  const loadingState = useSelector(state => state.location?.loading);
  const LgaForState = useSelector(state => state.location?.lga ?? []);
  const loadingLga = useSelector(state => state.location?.lga?.loadingLga);

  const [conditionVisible, setConditionVisible] = useState(false);

  const [visible1, setvisible1] = useState(false);
  const [visible2, setvisible2] = useState(false);
  const [visible3, setvisible3] = useState(false);
  const [visible4, setvisible4] = useState(false);
  const [stateInNigeria, setStateInNigeria] = useState([]);
  React.useEffect(() => {
    dispatch(getAllState());
  }, []);

  const getLgaAction = payload => {
    console.log(payload, 'dd');
    const findObjectByName = (array, name) => {
      return AllState?.find(item => item.label === payload);
    };

    dispatch(getLgaById(findObjectByName()?.id));
  };

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess({
        item_name: values.name,
        description: values.description,
        area: values.area,
        states: values.state,
        address: values.address,
        condition: values.condition,
        price: values.price,
        defect: values.defectReason ? values.defectReason : 'None',
      }),
    );
    navigation.navigate('Item2');
  };

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
      name: '',
      description: '',
      area: '',
      state: '',
      address: '',
      condition: '',
      defectReason: '',
    },

    validationSchema: ItemSchema1,

    onSubmit: () => {
      SetItemProduct(values);
      // UserLogin();
    },
  });

  const handleFocus = fieldName => {
    setFieldValue(fieldName + 'Focused', true);
  };

  // Function to handle onBlur event
  const handleBlur = fieldName => {
    setFieldValue(fieldName + 'Focused', false);
  };

  console.log(values, 'akkknkndad');
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <AddItemHeader
        borderBottom={true}
        title="Add Item"
       
        rightComponent={true}
        rightText="1/4"
        fullBorderWidth={true}
        borderBottom1
      
        
     
        // borderBottom4
      />

      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ViewContainer paddingHorizontal={20}>
          <Spacer height={30} />
          <SemiBoldText color={colors.darkBlack} fontSize={fontSize.md + 2}>
            Basic Info
          </SemiBoldText>
          <Spacer height={30} />
          <Input
            label="Item Name *"
            onBlur={() => handleBlur('name')}
            onFocus={() => handleFocus('name')}
            inputContainerStyle={[
              InputContainerStyle2,
              values.name && valueFilledUnFocused,
              values.nameFocused && FocusedInput,
              (values.name || values.nameFocused) && {backgroundColor: 'white'},
              errors.name && touched.name && errorStyle,
            ]}
            inputStyle={inputStyle}
            placeholder="Enter item name"
            labelStyle={[
              labelStyle,
              values.nameFocused && {color: colors.mainColor},
              errors.name && touched.name && {color: 'red'},
            ]}
            
            onChangeText={handleChange('name')}
            errorMessage={errors.name && errors.name}
          />
          {errors.name && <Spacer height={15} />}

          <Input
            multiline={true}
            numberOfLines={7}
            style={{textAlignVertical: 'top'}}
            label="Description *"
            onBlur={() => handleBlur('Description')}
            onFocus={() => handleFocus('Description')}
            inputContainerStyle={[
              InputContainerStyle2,
              values.description && valueFilledUnFocused,
              values.descriptionFocused && FocusedInput,
              (values.description || values.descriptionFocused) && {
                backgroundColor: 'white',
              },
              errors.description && errorStyle,
            ]}
            inputStyle={inputStyle}
            placeholder="Enter Description"
            labelStyle={[
              labelStyle,
              values.descriptionFocused && {color: colors.mainColor},
              errors.description && {color: 'red'},
            ]}
            onChangeText={handleChange('description')}
            errorMessage={errors.description && errors.description}
          />
          {errors.description && <Spacer height={15} />}

          <Spacer height={22} />
          <View style={{marginTop: -30}}>
            <ModalDropdown
              data={AllState}
              headerTitle="State"
              placeholder="Select State"
              onPress={e => {
                setFieldValue('state', e);
                getLgaAction(e);
              }}
              loading1={loadingState}
              // onPress={
              //   (e => setFieldValue('state', e),
              //   (e) => ())
              // }
              error={errors.state && errors.state}
              backgroundColor={
                !values.state == '' && !errors.state && COLOR.white
              }
              // inputBold={!values.state == '' && true}
              required
              visible={visible1}
              setVisible={setvisible1}
            />
          </View>

          <Spacer height={15} />
          <View>
            <ModalDropdown
              headerTitle="Area(Local Goverment) *"
              data={LgaForState}
              placeholder="Select Local Goverment"
              onPress={e => {
                setFieldValue('area', e);
              }}
              error={errors.area && errors.area}
              backgroundColor={
                !values.area == '' && !errors.area && COLOR.white
              }
              loading1={loadingLga}
              visible={visible2}
              setVisible={setvisible2}
            />
          </View>
          <Spacer height={12} />
          <Input
            label="Address *"
            onBlur={() => handleBlur('address')}
            onFocus={() => handleFocus('address')}
            inputContainerStyle={[
              InputContainerStyle2,
              values.address && valueFilledUnFocused,
              values.addressFocused && FocusedInput,
              (values.address || values.addressFocused) && {
                backgroundColor: 'white',
              },
              errors.address && errorStyle,
            ]}
            inputStyle={inputStyle}
            placeholder="Enter Item Address"
            labelStyle={[
              labelStyle,
              values.addressFocused && {color: colors.mainColor},
              errors.address && {color: 'red'},
            ]}
            onChangeText={handleChange('address')}
            errorMessage={errors.address && errors.address}
          />
          {errors.address && <Spacer height={15} />}

          <ConditionItemDropdown
            data={data}
            headerTitle="Item Condition"
            placeholder="Select Condition"
            onPress={e => setFieldValue('condition', e)}
            componentTitle={'Condtion'}
            hideSearch={true}
            error={errors.condition}
            backgroundColor={
              !values.condition == '' && !errors.condition && COLOR.white
            }
            required={true}
            visible={false}
            setVisible={setConditionVisible}
            title={values.condition}
            // title="adaf"
          />
          {values.condition == 'Neatly Used' && (
            <View
              style={{
                marginVertical: 30,
                // marginTop: HP(-0.1),
                marginLeft:5
              }}>
              <Text style={labelStyle}>Does the item have any defect(s)? *</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '40%',
                  marginVertical: 10,
                }}>
                {DefectIMap.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{flexDirection: 'row'}}
                    onPress={() => setFieldValue('selectedId', item.title)}>
                    <React.Fragment>
                      <MaterialCommunityIcons
                        name={
                          values.selectedId == item.title
                            ? 'circle-slice-8'
                            : 'checkbox-blank-circle-outline'
                        }
                        size={24}
                        color={
                          values.selectedId == item.title
                            ? COLOR.mainColor
                            : COLOR.black
                        }
                      />
                      <View>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                    </React.Fragment>
                    {/*   onChange={e => setFieldValue('category', e.value)} */}

                    {/**/}
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={{marginTop: 10, color: 'red'}}>
                {errors.selectedId}
              </Text>
              {values.selectedId == 'Yes' && (
                <>
                  <FormInput
                    placeholder="Defect(issue)"
                    label="Defect(issue)"
                    multiline={true}
                    onChangeText={text => setFieldValue('defectReason', text)}
                    backgroundColor={
                      !values.defectReason == '' &&
                      !errors.defectReason &&
                      COLOR.white
                    }
                    error={errors.defectReason && errors.defectReason}
                  />
                </>
              )}
            </View>
          )}

          <Spacer height={40} />
          <PrimaryButton
            onPress={handleSubmit}
            color={Object.keys(errors).length !== 0 ? colors.disabled : 'white'}
            backgroundColor={
              Object.keys(errors).length !== 0 ? '#F2F4F7' : colors.mainColor
            }
            disabled={Object.keys(errors).length !== 0 ? true : false}
            text="Next"
          />

          <ConditionItem
            visible={conditionVisible}
            setModalVisible={setConditionVisible}
            onPress1={e => setFieldValue('condition', 'New')}
            onPress2={e => setFieldValue('condition', 'Neatly Used')}
            onClose={() => setConditionVisible(false)}
          />
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

export default AddItem1;

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
    // paddingTop: HP(2),
    width: WP(104),
    // position:'absolute',
    // zIndex:1300,
    // marginTop:100,
    // top:3000
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
  text: {
    // fontSize: 15,
    //  fontWeight:'bold',
    color: 'black',
    fontFamily: FontFamily.regular,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
  },
  btn: {
    marginTop: HP(3),
    alignSelf: 'center',
    width: '100%',
  },
  dropItem: {
    paddingTop: HP(3),
  },
  conditionError: {
    color: 'red',
  },
  header: {
    // marginTop: HP(3),
    // width: '90%',
    marginLeft: 25,
    // height: HP(18),
  },
  basicInfo: {
    fontSize: WP(4.5),
    //  fontWeight:'bold',
    color: '#344054',
    fontFamily: FontFamily.bold,
    // marginLeft: -8,
    paddingBottom: 14,
    marginLeft: 10,
  },
  formInput: {
    right: 10,
  },
  required: {
    color: COLOR.mainColor,
  },
  title: {
    fontFamily: FontFamily.regular,
    marginTop: HP(0.5),
    marginHorizontal: 10,
  },
});
