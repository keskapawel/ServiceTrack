import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISingleTicket, ITicket } from 'models/Ticket';
import { providesList } from 'services/utils';

export const ticketsApi = api.injectEndpoints({
  endpoints: (build) => ({
    tickets: build.query<IApiData<ITicket>, object>({
      query: () => {
        return {
          url: `serviceModule/tickets`,
        };
      },
      providesTags: providesList[BASE_TAGS.TICKETS],
    }),
    getUserTickets: build.query<IApiData<ITicket>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/tickets/${id}`,
        };
      },
      providesTags: providesList[BASE_TAGS.USER_TICKETS],
    }),
    getSingleTicket: build.query<IApiData<{ ticket: ISingleTicket }>, { id: string }>({
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

export const { useTicketsQuery, useGetUserTicketsQuery, useGetSingleTicketQuery } = ticketsApi;
