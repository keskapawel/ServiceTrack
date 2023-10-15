import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISIngleUser, IUsers } from 'models/User';
import { providesList } from 'services/utils';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<IApiData<IUsers>, object>({
      query: () => {
        return {
          url: `adminModule/users`,
        };
      },
      providesTags: providesList[BASE_TAGS.TICKETS],
    }),
    getUserTickets: build.query<IApiData<IUsers>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/tickets/${id}`,
        };
      },
      providesTags: providesList[BASE_TAGS.USER_TICKETS],
    }),
    getSingleTicket: build.query<IApiData<{ ticket: ISIngleUser }>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/ticket/${id}`,
        };
      },
      providesTags: providesList[BASE_TAGS.TICKET],
    }),
  }),
  overrideExisting: false,
});

export const { useUsersQuery, useGetUserTicketsQuery, useGetSingleTicketQuery } = usersApi;
