import { IApiData } from 'models/Api';
import { api } from 'services/api';
import { BASE_TAGS } from 'services/tags';
import { IClients } from 'models/Client';

export const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clients: build.query<IApiData<IClients>, void>({
      query: () => {
        return {
          url: `serviceModule/clients`,
        };
      },
      providesTags: [BASE_TAGS.CLIENTS],
    }),
  }),
  overrideExisting: false,
});

export const { useClientsQuery } = clientsApi;
