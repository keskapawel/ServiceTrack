import { IApiData, IPaginationApiData, IQuery } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { ISingleTicket, ISingleTicketUpdate, ITicket, SubscribeMethod } from 'models/Ticket';

export const ticketsApi = api.injectEndpoints({
  endpoints: (build) => ({
    tickets: build.query<IPaginationApiData<ITicket>, IQuery>({
      query: ({ paginationQuery, sortQuery }) => {
        return {
          url: `serviceModule/tickets`,
          params: {
            ...paginationQuery,
            ...sortQuery,
            size: 15,
          },
        };
      },
      providesTags: [BASE_TAGS.TICKETS],
    }),
    manageSubscribtion: build.mutation<IPaginationApiData<ITicket>, { ticketId: string; userId: string; applyMethod: SubscribeMethod }>({
      query: ({ ticketId, userId, applyMethod }) => {
        return {
          url: `serviceModule/tickets/${ticketId}/${userId}/${applyMethod}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: [BASE_TAGS.TICKETS, BASE_TAGS.TICKET],
    }),
    getUserTickets: build.query<IPaginationApiData<ITicket>, IQuery & { id: string }>({
      query: ({ paginationQuery, sortQuery, id }) => {
        return {
          url: `serviceModule/tickets/${id}`,
          params: {
            ...paginationQuery,
            ...sortQuery,
            size: 5,
          },
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
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET, BASE_TAGS.TICKET_ACTIVITY, BASE_TAGS.TICKETS, BASE_TAGS.USER_TICKETS],
    }),
    createSingleTicket: build.mutation<IApiData<{ ticket: ISingleTicket }>, ISingleTicketUpdate>({
      query: (data) => {
        return {
          url: `serviceModule/tickets`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET],
    }),
  }),
  overrideExisting: false,
});

export const {
  useTicketsQuery,
  useGetUserTicketsQuery,
  useGetSingleTicketQuery,
  useUpdateSingleTicketMutation,
  useCreateSingleTicketMutation,
  useManageSubscribtionMutation,
} = ticketsApi;
