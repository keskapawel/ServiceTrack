import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { IActivity } from 'models/Activity';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTicketActivities: build.query<IApiData<IActivity>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `serviceModule/activities/${id}`,
        };
      },
      providesTags: [BASE_TAGS.TICKET_ACTIVITY],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTicketActivitiesQuery } = commentsApi;
