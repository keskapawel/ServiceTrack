import { api } from '../../services/api';
import { BASE_TAGS } from '../../services/tags';
import type { IApiData } from '../../models/Api';

import type { TChangePasswordRequest, TLoginRequest, TLogoutResponse, TRegisterRequest } from './types';
import { ISingleProfile } from 'models/Profile';
import { ISIngleUser } from 'models/User';

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
    register: build.mutation<IApiData<any>, TRegisterRequest>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: [BASE_TAGS.PROFILE],
    }),
    logOut: build.mutation<TLogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [],
    }),
    profile: build.query<IApiData<ISingleProfile>, void>({
      query: () => ({ url: 'profile' }),
      providesTags: [BASE_TAGS.PROFILE],
    }),
    changePassword: build.mutation<IApiData<{ myProfile: ISIngleUser }>, TChangePasswordRequest>({
      query: (data) => ({
        url: 'profile/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [BASE_TAGS.PROFILE],
    }),
  }),
  overrideExisting: false,
});

export const { useLogInMutation, useProfileQuery, useLogOutMutation, useRegisterMutation, useChangePasswordMutation } = authApi;
