import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopHeader} from '../../component/view/headers/topHeader';
import {Spacer, ViewContainer} from '../../component/view';
import {Input} from '@rneui/base';
import {InputContainerStyle, errorStyle, labelStyle} from '../Auth/styling';
import {RFFontSize} from '../../utils/text';
import {font} from '../../utils/theme/fonts';
import {PrimaryButton} from '../../component/view/button';
import {useFormik} from 'formik';
import {allFieldsFilled} from '../../utils/general';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { ReportUserApi } from '../../../redux/payment/api';

const ReportScreen = () => {
  const {colors} = useTheme();
  const loading = useSelector(state => state.payment.loading);
  const dispatch = useDispatch();
  const [users, setUsers] = React.useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const {getItem, setItem} = useAsyncStorage('@declut_user');

  const readItemFromStorage = async () => {
    const item = await getItem();
    setUsers(JSON.parse(item)?.user);
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, []);

  const reportUser = () => {
    dispatch(ReportUserApi(
        {
          report: values.report,
          reported_user: route?.params?.item?.item?.user_id,
          reporting_user: users?.id,
        },
        navigation,
      ),
    );
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
      report: '',
    },

    validationSchema: yup.object().shape({
      report: yup.string().required('The report  is required'),
    }),

    onSubmit: () => {
      reportUser();
    },
  });

  return (
    <SafeAreaView>
      <TopHeader title="Report and issue" />
      <ViewContainer>
        <Spacer height={60} />
        <Input
          onChangeText={handleChange('report')}
          multiline={true}
          inputContainerStyle={[
            InputContainerStyle,
            {
              backgroundColor: '#E4E7EC',
              height: 150,
            },
            errors.report && errorStyle,
          ]}
          inputStyle={labelStyle}
          // leftIcon={<Sms />}
          placeholder="I had some, you know...."
          // onChangeText={handleChange('phone')}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          errorMessage={touched.report && errors.report}
          //   errorMessage='adlmladnn'
        />

        <Spacer />
        <PrimaryButton
          disabled={!allFieldsFilled(values) ? true : false}
          onPress={handleSubmit}
          isLoading={loading}
          color={!allFieldsFilled(values) ? colors.disabled : 'white'}
          backgroundColor={
            !allFieldsFilled(values) ? '#F2F4F7' : colors.mainColor
          }
          text="Submit"
        />
      </ViewContainer>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
