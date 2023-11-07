import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { IComment, ICreateSingleComment, ISingleComment } from 'models/Comment';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTicketComments: build.query<IApiData<IComment>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/comments/?ticketId=${id}`,
        };
      },
      providesTags: [BASE_TAGS.TICKET_COMMENTS],
    }),
    createNewComment: build.mutation<IApiData<{ comment: ISingleComment }>, ICreateSingleComment>({
      query: (data) => {
        return {
          url: `serviceModule/comments`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [BASE_TAGS.TICKET_COMMENTS, BASE_TAGS.TICKET_ACTIVITY],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTicketCommentsQuery, useCreateNewCommentMutation } = commentsApi;
