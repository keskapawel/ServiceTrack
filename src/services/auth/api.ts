import { api } from '../../services/api';
import { BASE_TAGS } from '../../services/tags';
import type { IApiData } from '../../models/Api';

import type { TChangePasswordRequest, TLoginRequest, TLogoutResponse, TRegisterRequest } from './types';
import { ISingleProfile } from 'models/Profile';
import { ISIngleUser, ISIngleUserUpdate } from 'models/User';
import { INotificationsList, IUpdateNotification } from 'models/UserNotificationList';

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
    updateLoggedUser: build.mutation<IApiData<{ user: ISIngleUser }>, ISIngleUserUpdate>({
      query: (data) => ({
        url: 'profile/change-details',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [BASE_TAGS.PROFILE],
    }),
    updateNotificationsSettings: build.mutation<IApiData<INotificationsList>, IUpdateNotification[]>({
      query: (data) => ({
        url: 'profile/notifications',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [BASE_TAGS.PROFILE, BASE_TAGS.USER_NOTIFICATIONS_LIST],
    }),
    getNotificationsSettings: build.query<IApiData<INotificationsList>, void>({
      query: () => ({
        url: 'profile/notifications',
        method: 'GET',
      }),
      keepUnusedDataFor: 0.000001,
      providesTags: [BASE_TAGS.USER_NOTIFICATIONS_LIST],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLogInMutation,
  useProfileQuery,
  useLogOutMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useUpdateLoggedUserMutation,
  useGetNotificationsSettingsQuery,
  useUpdateNotificationsSettingsMutation,
} = authApi;
