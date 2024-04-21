// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import axiosInstance from '../../src/utils/network/axiosInterceptors';
import {AlertNofityError, AlertNofity} from '../../src/utils/notify';
import { SERVER_URL } from '../../src/utils/network/url';

const paymentApi = createSlice({
  name: 'paymentApi',
  initialState: {
    data: null,
    loading: false,
    error: null,
    paystackUrl: null,
    paymentLoading: false,
    paymentSuccess: true,
    confirmPayment: {},
    statusConfirmPayment: '',
    dismiss: false,
    bank: [],
    bankLoading: true,
    userBankDetail: {},
    userBankDetailLoading: false,
  },
  reducers: {
    orderPayment(state) {
      state.loading = true;
    },
    orderPaymentSuccess(state, action) {
      state.paystackUrl = action.payload;
      state.loading = false;
      state.error = null;
      state.dismiss = true;
    },
    orderPaymentFailure(state, action) {
      state.paystackUrl = null;
      state.loading = true;
      state.error = action.payload;
      state.dismiss = true;
    },

    confirmPaymentLoading(state) {
      state.paymentLoading = true;
      state.paymentSuccess = false;
      state.statusConfirmPayment = '';
    },
    confirmPaymentSuccess(state, action) {
      state.confirmPayment = action.payload;
      state.paymentSuccess = true;
      state.paymentLoading = true;
      state.error = null;
      state.statusConfirmPayment = 'Success';
      state.dismiss = true;
    },
    confirmPaymentFailure(state, action) {
      state.confirmPayment = {};
      state.paymentLoading = true;
      state.error = action.payload;
      state.paymentSuccess = true;
      state.statusConfirmPayment = 'Failed';
      state.dismiss = true;
    },
    listBankLoading(state) {
      state.bankLoading = true;
    },
    listBankSuccess(state, action) {
      state.bank = action.payload;
      state.bankLoading = false;
    },
    listBankFailure(state, action) {
      state.bank = [];
      state.bankLoading = false;
      state.error = action.payload;
    },
    userBankDetailLoading(state, action) {
      state.userBankDetailLoading = true;
    },

    userBankDetailSuccess(state, action) {
      state.userBankDetailLoading = false;
      state.userBankDetail = action.payload;
    }, // userBankDetail
    loadingStop(state, action) {
      state.loading = false;
    },
  },
});

export const {
  orderPayment,
  orderPaymentSuccess,
  orderPaymentFailure,
  confirmPaymentSuccess,
  confirmPaymentFailure,
  confirmPaymentLoading,
  listBankLoading,
  listBankSuccess,
  listBankFailure,
  userBankDetailSuccess,
  userBankDetailLoading,
  loadingStop,
} = paymentApi.actions;

export const orderPaymentApi = payload => async dispatch => {
  dispatch(orderPayment());
  payload.setloading(true);

  console.log('====================================');
  console.log(payload, 'dad`1111');
  console.log('====================================');
  try {
    await axiosInstance({
      url: `${SERVER_URL}/payment/order-item/${payload?.payload?.id}`,
      method: 'POST',
      data: {
        item_amount: payload?.payload?.item_amount,
        trx_ref: payload?.payload?.trx_ref,
      },
    })
      .then(response => {
        if (response?.data?.code == 200) {
          dispatch(orderPaymentSuccess(response));
          payload.navigation.navigate('Payment', {
            screen: 'PaymentInfo',
            params: {item: payload?.payload},
          });
        } else {
          AlertNofityError('Order', response?.message);
          payload.navigation.navigate('Payment', {
            screen: 'PaymentInfo',
            params: {item: payload?.payload},
          });
          dispatch(orderPaymentFailure(error));
        }
        payload.setloading(false);
      })
      .catch(error => {
        console.log(error,'error from order payment')
        payload.setloading(false);
        AlertNofityError('Order', error?.data?.message);
        dispatch(orderPaymentFailure(error));
        // payload.navigation.navigate('Payment', {
        //   screen: 'PaymentInfo',
        //   params: { user: 'jane' },
        // });
      });
  } catch (error) {
    payload.setloading(false);
    dispatch(orderPaymentFailure(error));
  }
};

export const confirmPayment = (payload, navigation) => async dispatch => {
  console.log(payload?.payload?.trx_ref, 'payload?.payload?.trx_ref');
  try {
    dispatch(confirmPaymentLoading());
    await axiosInstance({
      url: `${SERVER_URL}/payment/confirm?reference=${payload?.payload?.trx_ref}`,
      method: 'POST',
    })
      .then(response => {
        if (response?.data?.code == 200) {
          dispatch(orderPaymentSuccess(response));
          navigation.navigate('NoOrderScreen', {
            params: response?.data?.data,
          });
        } else {
          console.log(response, 'error from confirm payment');
          AlertNofityError('Order', response?.message);
          // navigation.navigate('HomeNavigation');
          dispatch(orderPaymentFailure(response));
        }
      })
      .catch(error => {
        console.log(error, 'error from confirm payment');
        AlertNofityError('Order', error?.data?.message);
        dispatch(orderPaymentFailure(error));
        navigation.navigate('HomeNavigation');
      });
  } catch (error) {
    console.log(error.response, 'error from confirm payment');
    dispatch(orderPaymentFailure(error));
  }
};

export const confirmPickUp =
  (payload, navigation, setModalVisible, setModalVisible2, setLoading) =>
  async dispatch => {
    try {
      setLoading(true);
      // {{host}}/payment/payout?complete_order=1&item_id=3&seller_id=1&reference=9c0bd123-09ff-4e15-a17f-2bd7448e74c3
      dispatch(confirmPaymentLoading());
      await axiosInstance({
        url: `${SERVER_URL}/payment/payout?complete_order=${payload?.complete_order}&item_id=${payload?.item_id}&seller_id=${payload?.seller_id}&reference=${payload?.reference}`,
        method: 'POST',
      })
        .then(response => {
          console.log(response, 'response from confirm  pickup');
          if (
            response?.data?.status == 'Success' ||
            response?.data?.code == 200
          ) {
            dispatch(orderPaymentSuccess(response));
            setModalVisible(false);
            setModalVisible2(true);
            setLoading(false);

            // navigation.navigate('OrderScreen', {
            //   params: response?.data?.data,
            // });
          } else {
            AlertNofityError('Order', response.data.message);
            setLoading(false);
            // navigation.navigate('BottomTabNavigation');
            dispatch(orderPaymentFailure(response));
          }
        })
        .catch(error => {
          setModalVisible(false);
          setModalVisible2(false);
          setLoading(false);

          console.log(error.response, 'error from confirm payment');
          AlertNofityError('Order', error?.data?.message);
          dispatch(orderPaymentFailure(error));

          // navigation.navigate('BottomTabNavigation');
        });
    } catch (error) {
      console.log(error, 'error from confirm pick');
      dispatch(orderPaymentFailure(error));
      setLoading(false);
    }
  };

export const rejectPickUp =
  (payload, navigation, setModalVisible, setModalVisible2 ,setLoading) =>
  async dispatch => {
    try {
      setLoading(true)
      // {{host}}/payment/payout?complete_order=1&item_id=3&seller_id=1&reference=9c0bd123-09ff-4e15-a17f-2bd7448e74c3
      dispatch(confirmPaymentLoading());
      await axiosInstance({
        url: `${SERVER_URL}/payment/payout?complete_order=${payload?.complete_order}&item_id=${payload?.item_id}&seller_id=${payload?.seller_id}&reference=${payload?.reference}`,
        method: 'POST',
      })
        .then(response => {
          console.log(response?.status,'response')
          AlertNofity('Order', 'Item rejected successfully.');
          console.log(response?.data, 'response from confirm  pickup');
          if (
            response?.data?.status == 'Success' ||
            response?.data?.code == 200 || response?.status==200
          ) {
            dispatch(orderPaymentSuccess(response));
            setModalVisible(false);
            setModalVisible2(false);
            setLoading(false);

            // setModalVisible2(true);

            navigation.navigate('OrderScreen', {
              params: response?.data?.data,
            });
          } else {
            AlertNofityError('Order', 'Kindly try again now!');
            // navigation.navigate('BottomTabNavigation');
            dispatch(orderPaymentFailure(response));
          }
        })
        .catch(error => {
          setLoading(false);
          setModalVisible(false);
          setModalVisible2(false);

          console.log(error, 'error from confirm payment');
          AlertNofityError('Order', error?.data?.message);
          dispatch(orderPaymentFailure(error));

          // navigation.navigate('BottomTabNavigation');
        });
    } catch (error) {
      console.log(error, 'error from confirm pick');
      dispatch(orderPaymentFailure(error));
    }
  };

export const getListOfBanks = payload => async dispatch => {
  try {
    dispatch(listBankLoading());
    await axiosInstance({
      url: `${SERVER_URL}/payment/banks`,
      method: 'GET',
    })
      .then(response => {
        dispatch(listBankSuccess(response?.data));
        return response?.data;
      })
      .catch(error => {
        // console.log(error,'dklandklkadnkdkankd')
        dispatch(listBankFailure(error));
        AlertNofityError('Order', error?.data?.message);
      });
  } catch (error) {
    dispatch(listBankFailure(error));
    dispatch(orderPaymentFailure(error));
  }
};

export const veriyBankDetail = (payload, navigation) => async dispatch => {
  dispatch(userBankDetailLoading());
  // console.log(payload, 'aldmlam');
  try {
    // {{host}}/payment/payout?complete_order=1&item_id=3&seller_id=1&reference=9c0bd123-09ff-4e15-a17f-2bd7448e74c3
    await axiosInstance({
      url: `${SERVER_URL}/payment/new-account-info`,
      method: 'post',
      data: payload,
    })
      .then(response => {
        dispatch(userBankDetailSuccess(response.data));
        // navigation.goBack();
        return response.data;
      })
      .catch(error => {
        // console.log(error, 'reer');
        AlertNofityError('Error', 'Something Went Wrong!!');

        // navigation.goBack('BottomTabNavigation');
      });
  } catch (error) {}
};

export const createBankDetail = (payload, navigation) => async dispatch => {
  // console.log(payload, 'aldmlam');
  try {
    // {{host}}/payment/payout?complete_order=1&item_id=3&seller_id=1&reference=9c0bd123-09ff-4e15-a17f-2bd7448e74c3
    await axiosInstance({
      url: `${SERVER_URL}/payment/new-account-info`,
      method: 'post',
      data: payload,
    })
      .then(response => {
        AlertNofity('Success', 'Information saved successfully');
        navigation.goBack();
        return response.data;
      })
      .catch(error => {
        // console.log(error, 'reer');
        AlertNofityError('Error', 'Something Went Wrong!!');

        // navigation.goBack('BottomTabNavigation');
      });
  } catch (error) {}
};

export const ReportUserApi = (payload, navigation) => async dispatch => {
  dispatch(orderPayment());
  try {
    await axiosInstance({
      url: `${SERVER_URL}/reports/reporter/${payload?.reporting_user}/reported/${payload?.reported_user}`,
      method: 'post',
      data: payload,
    })
      .then(response => {
        dispatch(loadingStop());
        AlertNofity('Success', 'User  reported Successfully');
        navigation.navigate('BottomTabNavigation');
      })
      .catch(error => {
        dispatch(loadingStop());
        console.log(error.response, 'error');
        AlertNofityError('Error', 'Something Went Wrong!!');

        // navigation.goBack('BottomTabNavigation');
      });
  } catch (error) {
    AlertNofityError('Error', 'Check your internet connection!!');
  }
};

export default paymentApi.reducer;
