// apiSlice.js
import {AnyAction, Dispatch, createSlice} from '@reduxjs/toolkit';
// import axiosInstance from '../../Util/axiosInterceptors';
import {upLoadFileApiPayload} from '../interface';
import axios from 'axios';
import axiosInstance from '../../src/utils/network/axiosInterceptors';
import {AlertNofity, AlertNofityError} from '../../src/utils/notify';
import {SERVER_URL} from '../../src/utils/network/url';

const productApi = createSlice({
  name: 'productApi',
  initialState: {
    data: null,
    customLocationData: [],
    myPost: null,
    loading: false,
    error: null,
    paystackUrl: null,
    updateUploadProgress: 0,
    editProductListItem: {},
    item: {
      item_name: '',
      description: '',
      area: '',
      state: '',
      address: '',
      condition: '',
      brand: '',
      price: '',
      defect: '',
      file: {},
      previewImage: {},
      category: '',
    },
    category: {},
    setting: null,
    orderHistory: [],
    orderHistoryPendingArray: [],
    deleteSucess: {},
    searchHistory: [],
    rating: null,
    ratingLoading: false,
    experienceLoading: false,
    experience: null,
    profilePicture: {},
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload;
      state.customLocationData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataCustomLocationSuccess(state, action) {
      state.customLocationData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    myPostLoading(state) {
      state.loading = true;
    },
    myPostSuccess(state, action) {
      state.myPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    myPostFailure(state, action) {
      state.myPost = null;
      state.loading = false;
      state.error = action.payload;
    },

    upLoadFileStart(state) {
      state.loading = true;
    },
    upLoadFileSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    upLoadFileFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    updateItemStart(state) {
      state.loading = true;
    },
    updateItemSuccess(
      state,
      {
        payload: {
          item_name,
          description,
          area,
          states,
          address,
          condition,
          defect,
          brand,
          price,
          image1,
          image2,
          image3,
          video,
        },
      },
    ) {
      state.item.item_name = item_name;
      state.item.description = description;
      state.item.area = area;
      state.item.state = states;
      state.item.address = address;
      state.item.condition = condition;
      state.item.brand = brand;
      state.item.price = price;
      state.item.defect = defect;
    },
    updateItemFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },

    updateItemLoading2(state) {
      state.loading = true;
    },
    updateItemSuccess2(state, {payload: {category, brand, defect}}) {
      state.item.category = category;
      state.item.brand = brand;
      state.item.defect = defect;
    },
    updateItemFailure2(state, action) {
      state.item.category == null;
      state.item.brand = '';
      state.loading = false;
      state.error = action.payload;
    },

    updateItemSuccess3(state, payload) {
      state.item.file = payload;
    },
    updateItemFailure3(state, action) {
      state.item.file = {};
      state.loading = false;
      state.error = action.payload;
    },

    updateImagePreView(state, action) {
      state.item.previewImage = action.payload;
    },

    updateItemLoading4(state) {
      state.loading = true;
    },
    updateItemSuccess4(state, {payload: {price}}) {
      state.item.price = price;
    },
    updateItemFailure4(state, action) {
      state.item.price = '';
      state.loading = false;
      state.error = action.payload;
    },

    // cAtegory
    categoryItemLoading(state) {
      state.loading = true;
    },

    categoryItemSuccess(state, action) {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    },
    categoryItemFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    settingLoading(state) {
      state.loading = true;
    },

    settingSuccess(state, action) {
      state.setting = action.payload;
      state.loading = false;
      state.error = null;
    },
    settingFailure(state, action) {
      state.setting = null;
      state.loading = false;
      state.error = action.payload;
    },

    orderHistoryLoading(state) {
      state.loading = true;
    },

    orderHistorySuccess(state, action) {
      state.orderHistory = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderHistoryFailure(state, action) {
      state.orderHistory = [];
      state.loading = false;
      state.error = action.payload;
    },

    orderHistoryPendingLoading(state) {
      state.loading = true;
    },

    orderHistoryPendingSuccess(state, action) {
      state.orderHistoryPendingArray = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderHistoryPendingFailure(state, action) {
      state.orderHistoryPendingArray = [];
      state.loading = false;
      state.error = action.payload;
    },

    deleteItemLoading(state) {
      state.loading = true;
    },

    delteItemSuccess(state, action) {
      state.deleteSucess = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    searchHistoryLoading(state) {
      state.loading = true;
    },

    searchHistorySuccess(state, action) {
      state.searchHistory = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchHistoryFailure(state, action) {
      state.searchHistory = [];
      state.loading = false;
      state.error = action.payload;
    },
    updateUploadProgress(state, action) {
      state.updateUploadProgress = action.payload;
    },

    editProductItemAction(state, action) {
      state.editProductListItem = action.payload;
    },
    editUpdateValue(state, action) {
      // Update any value based on the payload
      const {key, value} = action.payload;
      state[key] = value;
    },

    ratingLoading(state) {
      state.ratingLoading = true;
    },

    ratingSuccess(state, action) {
      state.rating = action.payload;
      state.ratingLoading = false;
      state.error = null;
    },
    ratingFailure(state, action) {
      state.rating = null;
      state.ratingLoading = false;
      state.error = action.payload;
    },
    experienceLoading(state) {
      state.experienceLoading = true;
    },

    experienceSuccess(state, action) {
      state.experience = action.payload;
      state.experienceLoading = false;
      state.error = null;
    },
    experienceFailure(state, action) {
      state.experience = null;
      state.experienceLoading = false;
      state.error = action.payload;
    },

    updateProfilePicture(state, action) {
      state.profilePicture = action.payload;
    },

    //
    //  editProduct
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  fetchDataCustomLocationSuccess,

  myPostLoading,
  myPostSuccess,
  myPostFailure,
  upLoadFileStart,
  upLoadFileSuccess,
  upLoadFileFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,

  categoryItemLoading,
  categoryItemSuccess,
  categoryItemFailure,
  settingLoading,
  settingSuccess,
  settingFailure,
  orderHistoryLoading,
  orderHistorySuccess,
  orderHistoryFailure,
  updateItemLoading2,
  updateItemSuccess2,
  updateItemFailure2,

  updateItemSuccess3,
  updateItemFailure3,

  updateItemLoading4,
  updateItemSuccess4,
  updateItemFailure4,

  updateImagePreView,

  deleteItemLoading,
  delteItemSuccess,
  deleteItemFailure,

  searchHistoryLoading,
  searchHistorySuccess,
  searchHistoryFailure,

  orderHistoryPendingLoading,
  orderHistoryPendingSuccess,
  orderHistoryPendingFailure,
  updateUploadProgress,
  editProductItemAction,
  editUpdateValue,

  ratingLoading,
  ratingSuccess,
  ratingFailure,

  experienceLoading,
  experienceSuccess,
  experienceFailure,
  updateProfilePicture,
} = productApi.actions;

export const fetchApiData = () => async dispatch => {
  try {
    dispatch(fetchDataStart());
    await axiosInstance({
      url: `${SERVER_URL}/item/list?viewer=buyer`,
    })
      .then(response => {
        // console.log(response.data?.data,'111')
        dispatch(fetchDataSuccess(response));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error));
      });
  } catch (error) {
    AlertNofityError('Network Error', 'No network connection detected!!');
    // notify('Network Failed', 'No network connection detected!!');
    dispatch(fetchDataFailure(error));
  }
};

export const fetchApiDataByLocation =
  (navigation, location) => async dispatch => {
    try {
      dispatch(fetchDataStart());
      await axiosInstance({
        url: `${SERVER_URL}/item/list?other-location=${location}&viewer=buyer`,
      })
        .then(response => {
          dispatch(fetchDataSuccess(response));

          // navigation.navigate('Home', {
          //   screen: 'All items', // Navigator name
          // });

          AlertNofity('Success', 'Item fetched succesfully!');
          // AlAl items

          // console.log(response.data?.data,'111')
        })
        .catch(error => {
          console.log(error, 'error');
          dispatch(fetchDataFailure(error));
        });
    } catch (error) {
      AlertNofityError('Network Failed', 'No network connection detected!!');
      dispatch(fetchDataFailure(error));
    }
  };

export const fetchApiDataByConditionState = payload => async dispatch => {
  try {
    dispatch(fetchDataStart());
    await axiosInstance({
      url: `${SERVER_URL}/item/list?${payload.conditionParams}=${payload.condition}&viewer=buyer`,
    })
      .then(response => {
        dispatch(fetchDataSuccess(response));

        payload.navigation.navigate('Home', {
          screen: 'All items', // Navigator name
        });

        AlertNofity('Success', 'Item fetched succesfully!');
        // AlAl items

        // console.log(response.data?.data,'111')
      })
      .catch(error => {
        console.log(error, 'error');
        dispatch(fetchDataFailure(error));
      });
  } catch (error) {
    notify('Network Failed', 'No network connection detected!!');
    dispatch(fetchDataFailure(error));
  }
};

export const MyPostItem = () => async dispatch => {
  try {
    dispatch(myPostLoading());
    await axiosInstance({
      url: `${SERVER_URL}/item/list?viewer=owner`,
    })
      .then(response => {
        dispatch(myPostSuccess(response.data));
      })
      .catch(error => {
        dispatch(myPostFailure(error));
      });
  } catch (error) {
    dispatch(myPostFailure(error));
  }
};

export const DeleteProduct = (id: string) => (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(deleteItemLoading());

    axiosInstance({
      url: `${SERVER_URL}/item/delete/${id}`,
      method: 'DELETE',
    })
      .then(response => {
        console.log(response?.data, 'lamdklmlkamdlknlak');
        if (response?.data?.code == 200) {
          AlertNofity('Product ', 'Item Deleted Successfully');

          dispatch(delteItemSuccess(response.data));
          dispatch(MyPostItem());
          resolve(response);
        } else {
          AlertNofityError(
            'Error Product ',
            response?.data?.message ?? 'Something went wrong!',
          );
          dispatch(deleteItemFailure(response?.data));
        }
      })
      .catch(error => {
        console.log(error?.data?.message, '111');
        AlertNofityError(
          'Erro',
          error.data.message ?? 'Check your internet connection!',
        );
        dispatch(deleteItemFailure(error));
        reject(error);
      });
  });
};

export const upLoadFileApi =
  (payload: upLoadFileApiPayload, navigation: any, Profile: any) =>
  async dispatch => {
    alert('upload api loading');
    // alert ('starting', 'staring');
    try {
      dispatch(upLoadFileStart());

      const response = await axiosInstance.post(
        `${SERVER_URL}/files/upload`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            // Calculate the percentage
            // console.log(progress,'progress')
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            // console.log(progress,'progress')
            // Dispatch an action to handle the progress
            dispatch(updateUploadProgress(progress));
          },
        },
      ); // Adjust endpoint as needed
      // alert('222222upload api loading');
      // console.log(response?.data?.data, 'response');
      dispatch(upLoadFileSuccess(response));
      dispatch(updateItemSuccess3(response?.data?.data));
      // navigation.navig hate('Item4');
      console.log('====================================');
      console.log(response.data.data);
      console.log('====================================');
      // alert('yes!!!');
      if (response.data.data && !Profile) {
        navigation.navigate('Item4');
      } else {
        alert('nonooooooo!!!!!!!!!!!!!!!!');
        dispatch(updateProfilePicture(response.data));

        // updateAvatar();
      }
    } catch (error) {
      // alert('noi!!!');
      console.log(error, 'error from upload file');
      dispatch(upLoadFileFailure(error));
    }
  };

export const upCreateProductApi =
  (
    payload: upLoadFileApiPayload,
    navigation: any,
    setVisible,
    setVisibleSuccessModal,
  ) =>
  async (dispatch: Dispatch<AnyAction>) => {
    setVisible(true);

    try {
      dispatch(upLoadFileStart());
      const response = await axiosInstance.post(
        `${SERVER_URL}/item/create`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data, 'resonse from upload');
      if (response.data?.code == 404) {
        AlertNofityError('Account', response.data?.message);
        navigation.navigate('Payment', {
          screen: 'PaymentForm',
        });
        //
      } else {
        AlertNofity('Upload', 'Product Upload Success');
        dispatch(upLoadFileSuccess(response.data));
        navigation.navigate('BottomTabNavigation');
      }
      setVisible(false);
      setVisibleSuccessModal(true);
      // Adjust endpoint as needed
    } catch (error) {
      console.log(error, 'error');
      AlertNofityError('Upload Failed', error.data?.message);
      dispatch(upLoadFileFailure(error));
      setVisible(false);
      setVisibleSuccessModal(false);
    }
  };

export const orderHistoryPendingApi = payload => async dispatch => {
  try {
    dispatch(orderHistoryPendingLoading());
    await axiosInstance({
      url: `${SERVER_URL}/order/histories?status=pending`,
    })
      .then(response => {
        console.log(response.data, 'response from order history');
        dispatch(orderHistoryPendingSuccess(response.data));
      })
      .catch(error => {
        dispatch(orderHistoryPendingFailure(error));
      });
  } catch (error) {
    dispatch(orderHistoryPendingFailure(error));
  }
};

export const orderHistoryApi = payload => async dispatch => {
  try {
    dispatch(orderHistoryLoading());
    await axiosInstance({
      url: `${SERVER_URL}/order/histories?status=resolved`,
    })
      .then(response => {
        console.log(response.data, 'response from order history');
        dispatch(orderHistorySuccess(response.data));
      })
      .catch(error => {
        dispatch(orderHistoryFailure(error));
      });
  } catch (error) {
    dispatch(orderHistoryFailure(error));
  }
};

export const fetchCategoryProduct = () => async dispatch => {
  try {
    dispatch(categoryItemLoading());
    await axiosInstance({
      url: `${SERVER_URL}/category/all`,
    })
      .then(response => {
        dispatch(categoryItemSuccess(response?.data));
      })
      .catch(error => {
        dispatch(categoryItemFailure(error));
      });
  } catch (error) {
    dispatch(categoryItemFailure(error));
  }
};

export const fetchCategoryProductById = payload => async dispatch => {
  try {
    dispatch(categoryItemLoading());
    await axiosInstance({
      url: `${SERVER_URL}/item/category/${payload}/list?viewer=buyer`,
    })
      .then(response => {
        dispatch(categoryItemSuccess(response?.data));
      })
      .catch(error => {
        dispatch(categoryItemFailure(error));
      });
  } catch (error) {
    dispatch(categoryItemFailure(error));
  }
};

export const settingApi = (payload, navigation) => async dispatch => {
  payload.navigation.goBack();
  try {
    dispatch(fetchDataStart());
    dispatch(settingLoading());
    await axiosInstance
      .post(`${SERVER_URL}/item/listing/settings`, payload)
      .then(response => {
        dispatch(settingSuccess(response?.data));
        AlertNofity('Setting', 'Setting Updated Successfully');
      })
      .catch(error => {
        AlertNofityError('Error', 'Something went wrong');
        dispatch(settingFailure(error));
      });
  } catch (error) {
    dispatch(settingFailure(error));
  }
};

export const SaveSearchKeyWord = () => async dispatch => {
  try {
    dispatch(searchHistoryLoading());
    await axiosInstance
      .get(`${SERVER_URL}/item/search-history`)
      .then(response => {
        dispatch(searchHistorySuccess(response?.data));
      })
      .catch(error => {
        console.log(error, 'error from settting');
        dispatch(searchHistoryFailure(error));
      });
  } catch (error) {
    dispatch(searchHistoryFailure(error));
  }
};

export const ratingApi = (payload, navigation) => async dispatch => {
  try {
    dispatch(ratingLoading());
    await axiosInstance
      .post(`${SERVER_URL}/rate-seller/${payload.seller_id}`, payload)
      .then(response => {
        dispatch(ratingSuccess(response.data));
        AlertNofity('Rating', 'Seller rated successfully');
        // navigation.goBack();
      })
      .catch(error => {
        AlertNofityError('Error', 'Something went wrong');
        dispatch(ratingFailure(error.message));
      });
  } catch (error) {
    AlertNofityError('Error', 'Something went wrong');
    dispatch(ratingFailure(error.message));
  }
};

export const experienceApi = (payload, navigation) => async dispatch => {
  try {
    dispatch(experienceLoading());
    await axiosInstance
      .post(`${SERVER_URL}/rate-seller/${payload.seller_id}`, payload)
      .then(response => {
        dispatch(experienceSuccess(response.data));
        AlertNofity('experience', 'Seller rated successfully');
        // navigation.goBack();
      })
      .catch(error => {
        AlertNofityError('Error', 'Something went wrong');
        dispatch(experienceFailure(error.message));
      });
  } catch (error) {
    AlertNofityError('Error', 'Something went wrong');
    dispatch(experienceFailure(error.message));
  }
};

// searchHistoryLoading,
//   searchHistorySuccess,
//   searchHistoryFailure,
export default productApi.reducer;
