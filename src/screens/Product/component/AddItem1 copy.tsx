import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
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
import {SemiBoldText, fontSize} from '../../../utils/text';
import {colors} from 'react-native-elements';
import {Spacer, ViewContainer} from '../../../component/view';
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

  return (
    <View style={[{flex: 1, backgroundColor: COLOR.white}]}>
      <View style={styles.header}>
        {/* <TopHeader
          title="Add Item"
          rightComponent={
            <SemiBoldText fontSize={14} color={colors.mainColor}>
              1/4
            </SemiBoldText>
          }
        /> */}
        <HeaderComponent
          rightComponent={true}
          title="Add Item"
          rightText={'1/4'}
          showStep={true}
          step1={true}
          rightColor={COLOR.mainBlack}
        />
      </View>
      <KeyboardAwareScrollView
        stickyHeaderIndices={[1]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        // contentContainerStyle={{
        //   paddingBottom: 13,
        //   marginLeft: 13,
        //   marginTop: -10,
        // }}
      >
        <View style={styles.subContainer}>
          <Formik
            validationSchema={ItemSchema1}
            initialValues={{
              name: '',
              description: '',
              area: '',
              state: '',
              address: '',
              condition: '',
              defectReason: '',
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
              isValid,
            },) => (

              console.log(errors, 'dadfds'),
              <ViewContainer paddingHorizontal={27}>
                <View style={{right: 10}}>
                  <SemiBoldText
                    color={colors.secondaryBlack}
                    fontSize={fontSize.md}
                    marginTop={10}>
                    Basic Info
                  </SemiBoldText>
                </View>
                <View
                  style={[
                    styles.formInput,
                    allFieldsFilled(values) && {backgroundColor: '#F9FAFB'},
                  ]}>
                  <FormInput
                    label={'Enter item name'}
                    placeholder="Enter item name "
                    onChangeText={handleChange('name')}
                    error={errors.name}
                    required
                    backgroundColor={
                      !values.name == '' && !errors.name && COLOR.white
                    }
                    inputBold={!values.name == '' && true}
                  />

                  <FormInput
                    label="Description"
                    placeholder="Description "
                    onChangeText={handleChange('description')}
                    multiline={true}
                    error={errors.description}
                    required
                    backgroundColor={
                      !values.description == '' &&
                      !errors.description &&
                      COLOR.white
                    }
                    inputBold={!values.description == '' && true}
                  />

                  <View style={{marginTop: -5}}>
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
                      error={errors.state}
                      backgroundColor={
                        !values.state == '' && !errors.state && COLOR.white
                      }
                      inputBold={!values.state == '' && true}
                      required
                      visible={visible1}
                      setVisible={setvisible1}
                    />
                  </View>

                  <View style={{marginTop: HP(-1)}}>
                    <ModalDropdown
                      headerTitle="Area(Local Goverment)"
                      data={LgaForState}
                      placeholder="Select Local Goverment"
                      onPress={e => {
                        setFieldValue('area', e);
                      }}
                      error={errors.area}
                      backgroundColor={
                        !values.area == '' && !errors.area && COLOR.white
                      }
                      loading1={loadingLga}
                      visible={visible2}
                      setVisible={setvisible2}
                    />
                  </View>
               
                  
               <View  style={{marginTop: HP(-2)}}>
               <FormInput
                    label={'Address'}
                    placeholder="5b Ajao road"
                    onChangeText={handleChange('address')}
                    error={errors.name}
                    required
                    backgroundColor={
                      !values.name == '' && !errors.name && COLOR.white
                    }
                    inputBold={!values.name == '' && true}
                  />
               </View>
                  

                  <Spacer />

                  <ConditionItem
                    visible={conditionVisible}
                    headerTitle="Item Condition"
                    setModalVisible={setConditionVisible}
                    onPress1={e => setFieldValue('condition', 'New')}
                    onPress2={e => setFieldValue('condition', 'Neatly')}
                    onClose={() => setConditionVisible(false)}
                  />

                  <ConditionItemDropdown
                    data={data}
                    headerTitle="Item Condition"
                    placeholder="Select Condition"
                    onPress={e => setFieldValue('condition', e)}
                    componentTitle={'Condtion'}
                    hideSearch={true}
                    error={errors.condition}
                    backgroundColor={
                      !values.condition == '' &&
                      !errors.condition &&
                      COLOR.white
                    }
                    required={true}
                    visible={false}
                    setVisible={setConditionVisible}
                    title={values.condition}
                    // title="adaf"
                  />

                  <View style={styles.btn}>
                    <FormButton
                      btnTitle="Next"
                      onPress={() => handleSubmit()}
                      btnColor={
                        !allFieldsFilled(values)
                          ? COLOR.lightgrey2
                          : COLOR.mainColor
                      }
                      disabled={!allFieldsFilled(values)}
                      COLOR={
                        !allFieldsFilled(values)
                          ? COLOR.lightgrey3
                          : COLOR.white
                      }
                    />
                  </View>
                </View>
              </ViewContainer>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
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
    alignSelf:'center',
    width:'100%'
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
