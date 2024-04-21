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
import ViewContainer from '../ViewContainer';
import HeaderComponent from '../HeaderComponent';
import {COLOR, FontFamily, HP, WP, allFieldsFilled} from '../../Util/Util';
import FormInput from '../FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {ItemSchema1} from 'Validation';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApiDataByLocation, updateItemSuccess} from '../../redux/product/api';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  LocalGoverment,
  StateAndCapital,
  StateInNigeria,
} from '../../Util/StateAndLga';
import DropDownSelect from '../DropDownSelect';
import ModalDropdown from '../ModalDropdown';
import Spacer from '../Spacer';
import {getAllState, getLgaById} from '../../redux/location/api';
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

const SettingLgaNigeriaScreen = ({
  visible,
  setVisible,
  visible2,
  setVisible2,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const AllState = useSelector(state => state.location?.data);
  const loadingState = useSelector(state => state.location?.loading);
  const LgaForState = useSelector(state => state.location?.lga ?? []);
  const loadingLga = useSelector(state => state.location?.lga?.loadingLga);

  const [stateInNigeria, setStateInNigeria] = useState([]);
  React.useEffect(() => {
    dispatch(getAllState());
  }, []);

  
  return (
    <View style={[{flex: 1, backgroundColor: COLOR.white}]}>
      <View style={styles.header}>
        <ModalDropdown
          data={LgaForState}
          headerTitle="State"
          placeholder="Select State"
          visible={visible}
          setVisible={setVisible}
          onPress={e => {
          }}
          loading1={loadingState}
          // onPress={
          //   (e => setFieldValue('state', e),
          //   (e) => ())
          // }
          // error={errors.state}
          // backgroundColor={!values.state == '' && !errors.state && COLOR.white}
          // inputBold={!values.state == '' && true}
          required
        />

        {/* {visible2 && <ModalDropdown
          data={AllState}
          headerTitle="State"
          placeholder="Select State"
          visible={visible2}
          setVisible={setVisible2}
          onPress={e => {
            getLgaAction(e);
          }}
          loading1={loadingState}
          // onPress={
          //   (e => setFieldValue('state', e),
          //   (e) => ())
          // }
          // error={errors.state}
          // backgroundColor={!values.state == '' && !errors.state && COLOR.white}
          // inputBold={!values.state == '' && true}
          required
        />} */}
      </View>
    </View>
  );
};

export default SettingLgaNigeriaScreen;

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
    paddingLeft: WP(3),
    paddingTop: HP(2),
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
    paddingTop: HP(10),
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
    marginLeft: 25,
    // height: HP(18),
  },
  basicInfo: {
    fontSize: WP(4.5),
    //  fontWeight:'bold',
    color: '#344054',
    fontFamily: FontFamily.bold,
    marginLeft: -8,
    paddingBottom: 14,
  },
  formInput: {
    marginLeft: WP(-2),
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
