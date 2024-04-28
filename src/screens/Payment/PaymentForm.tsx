import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BaseView, Spacer, ViewContainer} from '../../component/view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TopHeader} from '../../component/view/headers/topHeader';
import {useFormik} from 'formik';
import {
  createBankDetail,
  getListOfBanks,
  storeBankDetailApi,
  veriyBankDetail,
} from '../../../redux/payment/api';
import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../../old/component/FormInput';
import {SIZES} from '../../utils/theme/theme';
import {COLOR, HP, WP} from '../../old/Util/Util';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {SemiBoldText, fontSize} from '../../utils/text';
import {BankSchema} from '../Auth/validation';
import FormButton from '../../old/component/FormButton';
import {PrimaryButton} from '../../component/view/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AlertNofity} from '../../utils/notify';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import ModalDropdown from '../../old/component/ModalDropdown';

const PaymentForm = () => {
  const {colors} = useTheme();
  const bank = useSelector(state => state.payment?.bank?.data || []);
  const [isVisible, setisVisible] = useState(false);
  // const [loading, setloading] = useState(false);
  const [getAllItem, setgetAllItem] = useState({});
  const dispatch = useDispatch();
  const [listOfBanks, setListOfBanks] = useState([]);

  const {userBankDetail, userBankDetailLoading, storeBankLoading} = useSelector(
    state => state.payment,
  );
  const [filterWord, setFilterWord] = useState('');

  const {setItem} = useAsyncStorage('@has_user_account');

  const loading = useSelector(state => state.payment.userBankDetailLoading);
  React.useEffect(() => {
    dispatch(getListOfBanks());
  }, []);

  const navigation = useNavigation();

  const verifyUserBankDetail = () => {
    let payload = {
      account_number: values?.account_number,
      bank_code: getAllItem?.code,
      default: 1,
    };
    dispatch(veriyBankDetail(payload, navigation));
  };

  const StoreUserBankDetail = () => {
    let payload = {
      account_number: values?.account_number,
      bank_code: getAllItem?.code,
      bank_name: values?.bank_name,
      default: 1,
      account_name: userBankDetail?.data?.acct_name,
    };
    if (userBankDetail?.data?.acct_name == '') {
      Alert.alert('Bank', 'Kindly Verify your bank account!]');
    } else {
      dispatch(storeBankDetailApi(payload, navigation, setItem));
    }
  };
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      account_number: '',
      bank_code: '',
      bank_name: '',
      default: 1,
    },
    validationSchema: BankSchema,
    onSubmit: values => {
      verifyUserBankDetail();
    },
  });

  const FilterBank = () => {
    return bank.map(item => {
      return {
        value: item.name,
        label: item.name,
        code: item.code,
      };
    });
  };
  // React.useEffect(() => {
  //   FilterBank()
  // }, []); // Dependency array includes only filterWord

  // const filteredBanks = bank?.data?.filter(item =>
  //   item.name.toLowerCase().includes(filterWord.toLowerCase()),
  // );

  const ModalView = () => {
    return (
      <Modal isVisible={isVisible} onBackdropPress={() => setisVisible(false)}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <View
            style={{
              // marginTop: SIZES.height / 5,
              height: HP('120%'),
              backgroundColor: COLOR.white,
              width: WP(100),
              marginLeft: -20,
              paddingLeft: 10,
            }}>
            <>
              <TextInput
                placeholder="Search banks..."
                style={styles.textinput}
                onChangeText={text => setFilterWord(text)}
              />
            </>
            {/* {filterWord.length > 0 && (
              <FlatList
                contentContainerStyle={{paddingBottom: 450}}
                keyExtractor={item => item.id}
                data={filterWord}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{paddingTop: 20, paddingBottom: 20}}
                    onPress={() => {
                      setFieldValue('bank_name', item.name);
                      setFieldValue('bank_code', item.code);
                      setisVisible(false);
                    }}>
                    <SemiBoldText color={colors.darkBlack} style={styles.bank}>
                      {item.name}
                    </SemiBoldText>
                  </TouchableOpacity>
                )}
              />
            )} */}
            {/* <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            data={filteredBanks}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{paddingTop: 20, paddingBottom: 20}}
                onPress={e => {
                  setFieldValue('bank_name', item.name);
                  setFieldValue('bank_code', item.code);
                  setisVisible(false);
                }}>
                <SemiBoldText color={colors.darkBlack} style={styles.bank}>
                  {item.name}
                </SemiBoldText>
              </TouchableOpacity>
            )}
          /> */}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  console.log('====================================');
  console.log(getAllItem?.code, 'ada');
  console.log('====================================');
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader title="Payment Info" />
      <ViewContainer>
        <Spacer height={30} />

        <View style={styles.form}>
          <View style={{flexDirection: 'row'}}>
            <ModalDropdown
              componentTitle={'Banks'}
              
              headerTitle="Select Bank"
              data={FilterBank()}
              searchPlaceholder="Search Bank"
              placeholder="Select Bank"
              setAllItem={setgetAllItem}
              onPress={e => {
                console.log(e, '11lmlmaldmlamld');
                setFieldValue('bank_name', e);
                setFieldValue('bank_code', getAllItem?.code);
                setisVisible(false);
              }}
              error={errors.bank_name}
              loading1={false}
              visible={isVisible}
              setVisible={() => setisVisible(true)}
            />
            {/* <FormInput
              placeholder="Select Bank"
              label="Bank Name"
              onFocus={() => setisVisible(true)}
              value={values.bank_name}
              required
              error={errors.bank_name}
              onChangeText={() => setisVisible(true)}
            /> */}

            {/* <View style={{marginTop: 60, marginLeft: -35}}>
              <Entypo name="chevron-right" size={20} color={COLOR.black} />
            </View> */}
          </View>
          <FormInput
            placeholder="Enter Account Number"
            keyboardType="numeric"
            label="Account number"
            value={values.account_number}
            onChangeText={handleChange('account_number')}
            required
            error={errors.account_number}
          />

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{marginLeft: SIZES.height / 4}}>
            {/* */}
            {userBankDetailLoading ? (
              <ActivityIndicator color={COLOR.mainColor} />
            ) : (
              <SemiBoldText
                color={COLOR.mainColor}
                fontSize={fontSize.sm + 2}
                style={{fontStyle: 'italic'}}>
                Verify account number
              </SemiBoldText>
            )}
          </TouchableOpacity>
          <FormInput
            placeholder="Account Name"
            label="Account name"
            required
            disabled={true}
            value={userBankDetail?.data?.acct_name}
            backgroundColor={COLOR.white}
          />
        </View>
        <View style={styles.btn}>
          {/* <FormButton
            btnTitle="Save"
            onPress={() => StoreUserBankDetail()}
            // loading={userBankDetailLoading}
            disabled={userBankDetailLoading}
          /> */}

          <Spacer height={10} />

          {userBankDetail?.data?.acct_name && (
            <>
              <PrimaryButton
                onPress={() => {
                  StoreUserBankDetail();
                }}
                backgroundColor={
                  errors.account_number && errors.bank_code && errors.bank_name
                    ? colors.grey
                    : colors.mainColor
                }
                isLoading={storeBankLoading}
                text="Save"
                disabled={storeBankLoading}
              />
            </>
          )}
        </View>
      </ViewContainer>
    </BaseView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 0.3,
    borderRadius: 10,
    paddingTop: 10,
    marginTop: 30,
    width: '90%',
    paddingLeft: 15,
    color: 'black',
  },
});
