import { api } from '../../services/api';
import { BASE_TAGS } from '../../services/tags';
import type { IApiData } from '../../models/Api';

import type { TLoginRequest } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<IApiData<any>, TLoginRequest>({
      query: ({ login, password }) => ({
        url: 'login',
        method: 'POST',
        body: { user: { login, password } },
      }),
      invalidatesTags: [BASE_TAGS.PROFILE],
    }),
    profile: build.query<IApiData<any>, void>({
      query: () => ({ url: 'api/v1/profile' }),
      providesTags: [BASE_TAGS.PROFILE],
    }),
  }),
  overrideExisting: false,
});

export const { useLogInMutation, useProfileQuery } = authApi;
