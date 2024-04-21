import {
  Alert,
  FlatList,
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
  veriyBankDetail,
} from '../../../redux/payment/api';
import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../../old/component/FormInput';
import {SIZES} from '../../utils/theme/theme';
import {COLOR, HP, WP} from '../../old/Util/Util';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReactNativeModal from 'react-native-modal';
import {SemiBoldText} from '../../utils/text';
import {BankSchema} from '../Auth/validation';
import FormButton from '../../old/component/FormButton';
import {PrimaryButton} from '../../component/view/button';

const PaymentForm = () => {
  const {colors} = useTheme();
  const {bank} = useSelector(state => state.payment);
  const [isVisible, setisVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [filterWord, setFilterWord] = useState('');
  const dispatch = useDispatch();
  const {userBankDetail, userBankDetailLoading} = useSelector(
    state => state.payment,
  );
  React.useEffect(() => {
    dispatch(getListOfBanks());
  }, []);

  const navigation = useNavigation();

  const verifyUserBankDetail = () => {
    dispatch(veriyBankDetail(values, navigation));
  };

  const StoreUserBankDetail = () => {
    let payload = {
      account_number: values?.account_number,
      bank_code: values?.bank_code,
      bank_name: values?.bank_name,
      default: 1,
      account_name: userBankDetail?.data?.acct_name,
    };
    if (userBankDetail?.data?.acct_name == '') {
      Alert.alert('Bank', 'Kindly Verify your bank account!]');
    } else {
      dispatch(createBankDetail(payload, navigation));
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

  const filteredBanks = bank?.data?.filter(item =>
    item.name.toLowerCase().includes(filterWord.toLowerCase()),
  );

  const ModalView = () => {
    return (
      <ReactNativeModal
        isVisible={isVisible}
        onBackdropPress={() => setisVisible(false)}>
        <View
          style={{
            marginTop: SIZES.height / 5,
            height: HP('120%'),
            backgroundColor: COLOR.white,
            width: WP(100),
            marginLeft: -20,
            paddingLeft: 10,
          }}>
          <SafeAreaView>
            {/* <TextInput
              placeholder="Search banks..."
              style={styles.textinput}
              onChangeText={text => setFilterWord(text)}
            /> */}
          </SafeAreaView>
          <FlatList
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
          />
        </View>
      </ReactNativeModal>
    );
  };

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader borderBottom title="Payment Info" />
      <ViewContainer>
        <Spacer height={30} />

        <View style={styles.form}>
          <FormInput
            placeholder="E.g select---"
            label="Bank Name"
            onFocus={() => setisVisible(true)}
            value={values.bank_name}
            required
            error={errors.bank_name}
            onChangeText={() => setisVisible(true)}
          />

          <FormInput
            placeholder="E.g 0000000000 "
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
              <Text style={styles.verify}>Verify account number</Text>
            )}
          </TouchableOpacity>
          <FormInput
            placeholder="E.g Valentine Ajuzieogu"
            label="Account name"
            required
            disabled={true}
            value={userBankDetail?.data?.acct_name}
            backgroundColor={COLOR.white}
          />
          <FormInput
            placeholder="E.g 80000000000 "
            label="Bvn(Optional)"
            keyboardType="numeric"
          />

          <ModalView />
        </View>
        <View style={styles.btn}>
          {/* <FormButton
            btnTitle="Save"
            onPress={() => StoreUserBankDetail()}
            // loading={userBankDetailLoading}
            disabled={userBankDetailLoading}
          /> */}
          <Spacer height={120} />

          {userBankDetail?.data?.acct_name && (
            <>
              <PrimaryButton
                backgroundColor={
                  errors.account_number && errors.bank_code && errors.bank_name
                    ? colors.grey
                    : colors.mainColor
                }
                loading={userBankDetailLoading}
                text="Save"
                disabled={userBankDetailLoading}
              />
            </>
          )}
        </View>
      </ViewContainer>
    </BaseView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({});
