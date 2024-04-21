import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {authApi} from './auth/api';
// import { product } from './product/api'
import productApi from './product/api';
// import authReducer from './auth'
 import profileReducer  from './auth/profile'
import paymentReducer from './payment/api';
import searchReducer from './search/api';
 import locationReducer  from './location/api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // auth: authReducer,
    product: productApi,
     profile:profileReducer,
    payment: paymentReducer,
    search: searchReducer,
   location:locationReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
