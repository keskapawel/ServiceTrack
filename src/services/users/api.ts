import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISIngleUser, ISIngleUserUpdate, IUsers } from 'models/User';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<IApiData<IUsers>, object>({
      query: () => {
        return {
          url: `adminModule/users`,
        };
      },
      providesTags: [BASE_TAGS.USERS],
    }),
    getSingleUser: build.query<IApiData<{ user: ISIngleUser }>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `adminModule/user/${id}`,
        };
      },
      providesTags: [BASE_TAGS.SINGLE_USER],
    }),
    updateSingleUser: build.mutation<IApiData<{ user: ISIngleUser }>, ISIngleUserUpdate>({
      query: (data) => {
        return {
          url: `adminModule/user`,
          method: 'PUT',
          body: { ...data, id: data.uuid },
        };
      },
      invalidatesTags: [BASE_TAGS.SINGLE_USER],
    }),
    createSingleUser: build.mutation<IApiData<{ user: ISIngleUser }>, ISIngleUserUpdate>({
      query: (data) => {
        return {
          url: `adminModule/users`,
          method: 'POST',
          body: {
            ...data,
            uuid: null,
          },
        };
      },
      invalidatesTags: [BASE_TAGS.SINGLE_USER],
    }),
    changeUserState: build.mutation<IApiData<{ user: ISIngleUser }>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `adminModule/user/state/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: [BASE_TAGS.SINGLE_USER],
    }),
  }),
  overrideExisting: false,
});

export const { useUsersQuery, useGetSingleUserQuery, useUpdateSingleUserMutation, useCreateSingleUserMutation, useChangeUserStateMutation } =
  usersApi;
