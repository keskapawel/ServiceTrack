/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnwrapPromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { RootState } from '../store';
import { deleteToken, setToken } from '../reducers/auth-reducer/actions';

import { TBaseQueryFunc, TBaseQueryWithResult } from './types';
import { getUrlFromArgs, isAuthRequiredForUrl, mutex, shouldReauthenticate } from './utils';
import { AUTH_HEADER } from './constants';
import { stringify } from 'query-string';

const getToken = ({ getState }: Partial<BaseQueryApi>) => (getState?.() as RootState).auth.token;

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

export const baseQueryCamelize: TBaseQueryFunc = async (args, api, extraOptions) => {
  if (typeof args === 'object' && args.body && !(args.body instanceof FormData)) {
    args.body = decamelizeKeys(args.body);
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    result.data = camelizeKeys(result.data as any);
  }

  return result;
};

export const baseQueryWithReauth: TBaseQueryFunc = async (args, api, extraOptions) => {
  const token = getToken(api);

  if (!token && isAuthRequiredForUrl(getUrlFromArgs(args))) {
    return {
      error: {
        data: { error: 'Request cancelled!' },
        status: 499 /* HTTP Client Closed Request (499) */,
      },
    };
  }

  let result = await waitForUnlockAndRunQueryAsync(args, api, extraOptions);

  if (shouldReauthenticate(result)) {
    result = await reauthenticateAsync(result, args, api, extraOptions);
  }

  setTokenFromResponse(result, api);

  return result;
};

const waitForUnlockAndRunQueryAsync: TBaseQueryFunc = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  return await baseQueryCamelize(args, api, extraOptions);
};

const reauthenticateAsync: TBaseQueryWithResult = async (previousResult, args, api, extraOptions) => {
  if (mutex.isLocked()) {
    return await waitForUnlockAndRunQueryAsync(args, api, extraOptions);
  }

  return await refreshTokenAsync(previousResult, args, api, extraOptions);
};

const refreshTokenAsync: TBaseQueryWithResult = async (previousResult, args, api, extraOptions) => {
  const release = await mutex.acquire();

  // try to get a new token
  try {
    const refreshResult = await baseQueryCamelize({ url: 'api/v1/refresh_tokens', method: 'POST' }, api, extraOptions);

    if (refreshResult.data) {
      setTokenFromResponse(refreshResult, api);

      // retry the initial query
      return await baseQueryCamelize(args, api, extraOptions);
    } else {
      api.dispatch(deleteToken());
    }
  } finally {
    // unlock mutex
    release();
  }

  return previousResult;
};

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
