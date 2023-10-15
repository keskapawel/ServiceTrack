import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISIngleUser, ISIngleUserUpdate, IUsers } from 'models/User';
import { providesList } from 'services/utils';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<IApiData<IUsers>, object>({
      query: () => {
        return {
          url: `adminModule/users`,
        };
      },
      providesTags: providesList[BASE_TAGS.USERS],
    }),
    getSingleUser: build.query<IApiData<{ user: ISIngleUser }>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `adminModule/user/${id}`,
        };
      },
      providesTags: providesList[BASE_TAGS.SINGLE_USER],
    }),
    updateSingleUser: build.mutation<IApiData<{ user: ISIngleUser }>, ISIngleUserUpdate>({
      query: (data) => {
        return {
          url: `adminModule/user`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.SINGLE_USER],
    }),
    createSingleUser: build.mutation<IApiData<{ user: ISIngleUser }>, ISIngleUserUpdate>({
      query: (data) => {
        return {
          url: `adminModule/users`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.SINGLE_USER],
    }),
  }),
  overrideExisting: false,
});

export const { useUsersQuery, useGetSingleUserQuery, useUpdateSingleUserMutation, useCreateSingleUserMutation } = usersApi;
