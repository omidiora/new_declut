// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import axiosInstance from '../../src/utils/network/axiosInterceptors';
import {SERVER_URL} from '../../src/utils/network/url';

const searchApi = createSlice({
  name: 'searchApi',
  initialState: {
    data: [],
    loading: false,
    error: null,
    lga: [],
    loadingLga: false,
  },
  reducers: {
    getSearchLoading(state) {
      state.loading = true;
      state.data = [];
    },
    getSearchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getSearchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {getSearchLoading, getSearchSuccess, getSearchFailure} =
  searchApi.actions;

export const searchResultApi = (payload) => async dispatch => {
  try {
    dispatch(getSearchLoading());
    await axiosInstance
      .get(`${SERVER_URL}/item/search?search=${payload}&viewer=buyer`)
      .then(response => {
        console.log(response?.data?.data,'responsekkkkkk!!!!')
        dispatch(getSearchSuccess(response.data));
        return response.data;
      })
      .catch(error => {
        console.log(error, 'error from getAllState');
        dispatch(getSearchFailure(error));
      });
  } catch (error) {
    dispatch(getSearchFailure(error));
  }
};

export default searchApi.reducer;
