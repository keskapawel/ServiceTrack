import { api } from '../../services/api';
import { BASE_TAGS } from '../../services/tags';
import type { IApiData } from '../../models/Api';

import type { TLoginRequest } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<IApiData<any>, TLoginRequest>({
      query: ({ userName, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { userName, password },
      }),
      invalidatesTags: [BASE_TAGS.PROFILE],
    }),
    profile: build.query<IApiData<any>, void>({
      query: () => ({ url: 'profile' }),
      providesTags: [BASE_TAGS.PROFILE],
    }),
  }),
  overrideExisting: false,
});

export const { useLogInMutation, useProfileQuery } = authApi;
