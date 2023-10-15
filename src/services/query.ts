/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnwrapPromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { stringify } from 'query-string';

import { RootState } from 'store';
import { deleteToken, setToken } from 'reducers/auth-reducer/actions';

import { TBaseQueryFunc, TBaseQueryWithResult } from './types';
import { getUrlFromArgs, isAuthRequiredForUrl, mutex, shouldReauthenticate } from './utils';
import { AUTH_HEADER } from './constants';

// const getToken = ({ getState }: Partial<BaseQueryApi>) => (getState?.() as RootState).auth.token;

const getToken = (data: any) => 'Basic dXNlcjpmZjhjNDA1Mi01ZTk5LTRlMTUtOTkwNS1jYzRhYTM0ZDIxYzE=';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  paramsSerializer: (params) => {
    const snakeKeysParams = decamelizeKeys(params) as typeof params;

    // sort param array values
    Object.keys(snakeKeysParams)?.forEach((key) => {
      if (Array.isArray(snakeKeysParams[key])) snakeKeysParams[key] = snakeKeysParams[key].sort();
    });

    return stringify(snakeKeysParams, {
      arrayFormat: 'bracket',
      skipNull: true,
      skipEmptyString: true,
    });
  },
  prepareHeaders: (headers, api) => {
    const token = getToken(api);

    headers.set('Accept', 'application/json');

    if (token) {
      headers.set(AUTH_HEADER, token);
    }

    return headers;
  },
}) as TBaseQueryFunc;

export const baseQueryWithReauth: TBaseQueryFunc = async (args, api, extraOptions) => {
  const token = getToken(api);

  // if (!token && isAuthRequiredForUrl(getUrlFromArgs(args))) {
  //   return {
  //     error: {
  //       data: { error: 'Request cancelled!' },
  //       status: 499 /* HTTP Client Closed Request (499) */,
  //     },
  //   };
  // }

  const result = await baseQuery(args, api, extraOptions);

  // if (shouldReauthenticate(result)) {
  //   result = await reauthenticateAsync(result, args, api, extraOptions);
  // }

  setTokenFromResponse(result, api);

  return result;
};

// const waitForUnlockAndRunQueryAsync: TBaseQueryFunc = async (args, api, extraOptions) => {
//   // wait until the mutex is available without locking it
//   await mutex.waitForUnlock();

//   return await baseQueryCamelize(args, api, extraOptions);
// };

const setTokenFromResponse = (result: UnwrapPromise<ReturnType<TBaseQueryFunc>>, api: BaseQueryApi): void => {
  const { meta } = result ?? {};

  if (meta && meta.response) {
    const {
      response: { headers },
    } = meta;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (headers.has(AUTH_HEADER)) api.dispatch(setToken(headers.get(AUTH_HEADER)!));
  }
};
