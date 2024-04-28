// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import {editProfilePayload, upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import {SERVER_URL} from '../../src/utils/network/url';
import axiosInstance from '../../src/utils/network/axiosInterceptors';
import {AlertNofity, AlertNofityError} from '../../src/utils/notify';
import {Alert} from 'react-native';

const ProfileApi = createSlice({
  name: 'profileApi',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    editProfileStart(state) {
      state.loading = true;
    },
    editProfileSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    editProfileFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    deleteAccountLoading(state, action) {
      state.loading = true;
    },
    deleteAccountSuccess(state, action) {
      state.data = null;
      state.loading = false;
    },
    deleteAccountFailure(state, action) {
      state.loading = false;
    },

    // uploadUserPicture(state, action) {
    //   state.data = [];
    // },
  },
});

export const {
  editProfileStart,
  editProfileSuccess,
  editProfileFailure,
  deleteAccountLoading,
  deleteAccountSuccess,
  deleteAccountFailure,
} = ProfileApi.actions;

// export const editProfileApi =
//   (payload: editProfilePayload, navigation: any) =>
//   async (dispatch: Dispatch<AnyAction>, navigation: any) => {
//     try {
//       dispatch(editProfileStart());
//       const response = await axiosInstance.post('/item/create', payload);
//       dispatch(editProfileSuccess(response.data));
//       return response;
//     } catch (error) {
//       dispatch(editProfileFailure(error));
//     }
//   };

export const editProfileApi = payload => async dispatch => {
  console.log(payload, 'payloadadafdafkdkandkfknadkfnkadsnkfnkadnfk');
  ;
  try {
    dispatch(editProfileStart());
    await axiosInstance({
      url: `${SERVER_URL}/auth/update-me/${payload.id}`,
      method: 'post',
      data: payload,
    })
      .then(response => {
        console.log(response, 'respone from edit profile');

        dispatch(editProfileSuccess(response.data));
        payload.navigation.goBack();
        payload.setItem(JSON.stringify(response.data?.data));
        AlertNofity(
          'Success',
          response?.data?.message ?? 'Profile updated successfully',
        );
      })
      .catch(error => {
        console.log(error, 'error from edit profile');
        dispatch(editProfileFailure(error));
        AlertNofityError('Error', error?.data?.message);
      });
  } catch (error) {
    dispatch(editProfileFailure(error));
  }
};

export const deleteAccountApi = (payload, navigation) => async dispatch => {
  dispatch(deleteAccountLoading());
  try {
    await axiosInstance({
      url: `${SERVER_URL}/auth/delete-account`,
      method: 'post',
      data: payload,
    })
      .then(response => {
        console.log(response.data, 'respone');
        dispatch(deleteAccountSuccess());
        Alert.alert('Account Deleted', 'Your Declut account was deleted.');
        payload.navigation('Auth');
      })
      .catch(error => {
        console.log(error.data, 'error');
        dispatch(dispatch(deleteAccountFailure()));
        AlertNofityError('Error', error?.data?.message);
      });
  } catch (error) {
    AlertNofityError('Error', 'Check your internet connection!');
    dispatch(dispatch(deleteAccountFailure()));
  }
};
export default ProfileApi.reducer;
