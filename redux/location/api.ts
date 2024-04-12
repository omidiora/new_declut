import {SERVER_URL} from './../../Util/Util';
// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Util/axiosInterceptors';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import {getUserAsyncStorage} from '../../Util';
import {AlertNofity, AlertNofityError, notifySucess} from '../../Util/notify';

const locationApi = createSlice({
  name: 'locationApi',
  initialState: {
    data: null,
    loading: false,
    error: null,
    lga:[],
    loadingLga:false
  },
  reducers: {
    getState(state) {
        state.loading = true;
        state.data = [];
    },
    getStateSuccess(state, action) {
      state.loading = false;
      state.data =action.payload;
      state.error = null;
    },
    getStateFailure(state, action) {
      
      state.loading = false;
      state.error = action.payload;
    },

    getLocalGovermentState(state) {
        state.loadingLga = true;
    },
    getLocalGovermentSuccess(state, action) {
      state.loadingLga = false;
      state.lga =action.payload;
      state.error = null;
    },
    getLocalGovermentFailure(state, action) {
      
      state.loadingLga = false;
      state.error = action.payload;
    },

  },
});

export const {
  getState,
  getStateSuccess,
  getStateFailure,
  getLocalGovermentState,
  getLocalGovermentSuccess,
  getLocalGovermentFailure

  
} = locationApi.actions;

export const  getAllState = () => async dispatch => {
    try {
      dispatch(getState());
      await axiosInstance
        .get(`${SERVER_URL}/location/states`)
        .then(response => {
            let responsedata=response?.data?.data?.map((item)=>{
                return{
                    id:item.id,
                    label:item.name,
                    value:item.name
                }
            })
            
          dispatch(getStateSuccess(responsedata));
        })
        .catch(error => {
          console.log(error, 'error from getAllState');
          dispatch(getStateFailure(error));
        });
    } catch (error) {
      dispatch(getStateFailure(error));
    }
  };


  export const  getLgaById= (id) => async dispatch => {
    try {
      dispatch(getLocalGovermentState());
      await axiosInstance
        .get(`${SERVER_URL}/location/lga/${id}`)
        .then(response => {
            let responsedata=response?.data?.data?.map((item)=>{
                return{
                    id:item.id,
                    label:item.local_name,
                    value:item.local_name
                }
            })
            
          dispatch(getLocalGovermentSuccess(responsedata));
        })
        .catch(error => {
          console.log(error, 'error from LGA');
          dispatch(getStateFailure(error));
        });
    } catch (error) {
      dispatch(getLocalGovermentFailure(error));
    }
  };

export default locationApi.reducer;
