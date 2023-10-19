import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISingleTicket, ISingleTicketUpdate, ITicket } from 'models/Ticket';
import { invalidatesItem, invalidatesList, providesItem, providesList } from 'services/utils';

export const ticketsApi = api.injectEndpoints({
  endpoints: (build) => ({
    tickets: build.query<IApiData<ITicket>, object>({
      query: () => {
        return {
          url: `serviceModule/tickets`,
        };
      },
      providesTags: [BASE_TAGS.TICKETS],
    }),
    getUserTickets: build.query<IApiData<ITicket>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/tickets/${id}`,
        };
      },
      providesTags: [BASE_TAGS.USER_TICKETS],
    }),
    getSingleTicket: build.query<IApiData<{ ticket: ISingleTicket }>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/ticket/${id}`,
        };
      },
      providesTags: [BASE_TAGS.TICKET],
    }),
    updateSingleTicket: build.mutation<IApiData<{ ticket: ISingleTicket }>, ISingleTicketUpdate>({
      query: (data) => {
        return {
          url: `serviceModule/ticket`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET, BASE_TAGS.TICKET_ACTIVITY],
    }),
    createSingleTicket: build.mutation<IApiData<{ ticket: ISingleTicket }>, ISingleTicketUpdate>({
      query: (data) => {
        return {
          url: `serviceModule/tickets`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET],
    }),
  }),
  overrideExisting: false,
});

export const { useTicketsQuery, useGetUserTicketsQuery, useGetSingleTicketQuery, useUpdateSingleTicketMutation, useCreateSingleTicketMutation } =
  ticketsApi;
