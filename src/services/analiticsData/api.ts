import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { EActivityType, IChartData, IMultiChartData } from 'models/AnaliticsData';

export const analiticsDataApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserActivityCountrInPeriod: build.query<
      IApiData<IChartData>,
      { userId: string; contentType: EActivityType; startDate: string; endDate: string }
    >({
      query: ({ userId, contentType, startDate, endDate }) => {
        return {
          url: `analise/chart/${startDate}/${endDate}/user/${userId}/${contentType}`,
        };
      },
      providesTags: [BASE_TAGS.ALL_USER_ACTIVITY_COUNT_IN_PERIOD, BASE_TAGS.CHARTS],
    }),
    generalUserActivityInPeriod: build.query<IApiData<IMultiChartData>, { userId: string; startDate: string; endDate: string }>({
      query: ({ userId, startDate, endDate }) => {
        return {
          url: `analise/multiChart/${startDate}/${endDate}/user/${userId}`,
        };
      },
      providesTags: [BASE_TAGS.ALL_USER_ACTIVITY_COUNT_IN_PERIOD, BASE_TAGS.CHARTS],
    }),
    generalUserActivityCounts: build.query<IApiData<IChartData>, { userId: string }>({
      query: ({ userId }) => {
        return {
          url: `analise/chart/all/user/${userId}`,
        };
      },
      providesTags: [BASE_TAGS.GENERAL_USER_ACTIVITY_COUNT_COUNTS, BASE_TAGS.CHARTS],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserActivityCountrInPeriodQuery, useGeneralUserActivityInPeriodQuery, useGeneralUserActivityCountsQuery } = analiticsDataApi;
