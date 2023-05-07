import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './query';
import { BASE_TAGS, BASE_TAGS_ARRAY } from './tags';

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  // to be customized later (token handling etc.)
  baseQuery: baseQueryWithReauth,
  tagTypes: BASE_TAGS_ARRAY,
  endpoints: (build) => ({
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: [BASE_TAGS.ERROR],
    }),
  }),
  keepUnusedDataFor: 0.1,
  // refetch threshold X seconds (for new subscriptions)
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});

export const { useRefetchErroredQueriesMutation } = api;
