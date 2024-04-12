import {createApi} from '@reduxjs/toolkit/query/react';
import {SERVER_URL} from '../../src/utils/network/url';
import {axiosBaseQuery} from '../../src/utils/network/axiosBaseQuery';


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({baseUrl: `${SERVER_URL}/`}),
  endpoints: builder => ({
    getInterest: builder.mutation<any, void>({
      query: () => ({
        url: 'item/list',
        method: 'get',
      }),
    }),
  }),
});

export const {useGetInterestMutation} = productApi;
