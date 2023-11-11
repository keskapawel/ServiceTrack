/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnwrapPromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { camelizeKeys } from 'humps';
import { stringify } from 'query-string';

import { RootState } from 'store';
import { deleteToken, setToken } from 'reducers/auth-reducer/actions';

import { TBaseQueryFunc, TBaseQueryWithResult } from './types';
import { getUrlFromArgs, isAuthRequiredForUrl, mutex, shouldReauthenticate } from './utils';
import { AUTH_HEADER } from './constants';

const getToken = ({ getState }: Partial<BaseQueryApi>) => {
  return (getState?.() as RootState).auth.token;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  paramsSerializer: (params) => {
    const snakeKeysParams = params;

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
  const result = await baseQuery(args, api, extraOptions);
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

  if (!token) setTokenFromResponse(result, api);
  return result;
};

const waitForUnlockAndRunQueryAsync: TBaseQueryFunc = async (args, api, extraOptions) => {
  return await baseQueryCamelize(args, api, extraOptions);
};

const reauthenticateAsync: TBaseQueryWithResult = async (previousResult, args, api, extraOptions) => {
  return await refreshTokenAsync(previousResult, args, api, extraOptions);
};

const refreshTokenAsync: TBaseQueryWithResult = async (previousResult, args, api, extraOptions) => {
  // try to get a new token
  try {
    const refreshResult = await baseQueryCamelize({ url: 'auth/refresh-token', method: 'POST' }, api, extraOptions);
    if (refreshResult.data) {
      setTokenFromResponse(refreshResult, api);

      // retry the initial query
      return await baseQueryCamelize(args, api, extraOptions);
    } else {
      api.dispatch(deleteToken());
    }
  } catch (e) {
    console.log(e, 'ERROR IN API QUERY');
  }

  return previousResult;
};

const setTokenFromResponse = (result: UnwrapPromise<ReturnType<any>>, api: BaseQueryApi): void => {
  const { data } = result ?? {};
  if (data && data.data) {
    const token = `Bearer ${data.data.token.accessToken}`;

    if (data.data.token.accessToken) api.dispatch(setToken(token));
  }
  return;
};
