import { api } from '../../services/api';
import { BASE_TAGS } from '../../services/tags';
import type { IApiData } from '../../models/Api';

import type { TLoginRequest, TLogoutResponse } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<IApiData<any>, TLoginRequest>({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: [BASE_TAGS.PROFILE],
    }),
    logOut: build.mutation<TLogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    profile: build.query<IApiData<any>, void>({
      query: () => ({ url: 'profile' }),
      providesTags: [BASE_TAGS.PROFILE],
    }),
  }),
  overrideExisting: false,
});

export const { useLogInMutation, useProfileQuery, useLogOutMutation } = authApi;
