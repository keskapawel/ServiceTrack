/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import type { UnwrapPromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import type { FetchArgs, FetchBaseQueryError, QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { pascalize } from 'humps';
import { Mutex } from 'async-mutex';

import { IApiData } from 'models/Api';
import { IApiFile } from 'models/File';

import type { TBaseQueryFunc, TApiError, TDeviseError, TRequestError } from './types';
import { EBaseId } from './types';
import { REAUTHENTICATE_SKIP } from './constants';
import { BASE_TAGS } from './tags';

export const mutex = new Mutex();

const isApiError = (error: unknown): error is TApiError => {
  return (
    error != null &&
    error != undefined &&
    typeof error === 'object' &&
    'status' in error &&
    'data' in error &&
    !!(error as any).data &&
    'error' in (error as any).data
  );
};

const isDeviseError = (error: unknown): error is TDeviseError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    'data' in error &&
    !!(error as any).data &&
    'errors' in (error as any).data &&
    typeof (error as any).data.errors === 'object'
  );
};

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
};

export const getErrorMessage = (error: TRequestError): ReactNode => {
  if (!error) return undefined;

  if (isApiError(error)) return error.data.error;

  if (isDeviseError(error))
    return Object.keys(error.data.errors).map((key) => (
      <>
        {pascalize(key)}: {error.data.errors[key].join(',')} <br />
      </>
    ));

  if (isFetchBaseQueryError(error)) return 'error' in error ? error.error : 'Unknown Error has occurred';

  if (isErrorWithMessage(error)) return error.message;

  return undefined;
};

export const getUrlFromArgs = (args: string | FetchArgs) => {
  if (!args) return '';

  if (typeof args === 'string') return args;

  return args.url;
};

export const isAuthRequiredForUrl = (url: string) => !REAUTHENTICATE_SKIP.some((skipUrl) => url.endsWith(skipUrl));

export const shouldReauthenticate = (result: UnwrapPromise<ReturnType<TBaseQueryFunc>>): boolean => {
  const { error, meta } = result;

  if (meta && error?.status === 401) {
    const {
      request: { url },
    } = meta;

    return isAuthRequiredForUrl(url);
  }

  return false;
};

/**
 * An individual cache item
 */
export type CacheItem<T extends BASE_TAGS, ID extends string | number> = { type: T; id: ID };

/**
 * A list of cache items, including a LIST entity cache
 */
export type CacheList<T extends BASE_TAGS, ID extends string | number> = (
  | CacheItem<T, EBaseId>
  | CacheItem<T, string>
  | CacheItem<T, ID>
  | BASE_TAGS
)[];

/**
 * Inner function returned by `providesList` to be passed to the `provides` property of a query
 */
type InnerProvidesList<T extends BASE_TAGS, Result extends { id: ID }, ID extends string | number> = <Results extends { id: ID }[]>(
  type: T,
  results: Result[] | undefined,
) => CacheList<T, Results[number]['id']>;

const concatErrorCache = <T extends BASE_TAGS, ID extends string | number>(
  existingCache: CacheList<T, ID> | undefined,
  error: FetchBaseQueryError | undefined,
): CacheList<T, ID> => (existingCache ? [...existingCache, BASE_TAGS.ERROR] : [BASE_TAGS.ERROR]);

/**
 * HOF to create an entity cache to provide a LIST,
 * depending on the results being in a common format.
 *
 * Will not provide individual items without a result.
 *
 * @example
 * ```ts
 * const results = [
 *   { id: 1, message: 'foo' },
 *   { id: 2, message: 'bar' }
 * ]
 * providesList('Todo')(results)
 * // [
 * //   { type: 'Todo', id: 'List'},
 * //   { type: 'Todo', id: 1 },
 * //   { type: 'Todo', id: 2 },
 * // ]
 * ```
 */
export const providesList =
  <T extends BASE_TAGS>(type: T, { parentIdArgsKey }: { parentIdArgsKey?: string } = {}) =>
  <Result extends { id: ID }, ID extends string | number>(
    results: IApiData<Result[]> | Result[] | undefined,
    error: FetchBaseQueryError | undefined,
    args: any,
  ): ReturnType<InnerProvidesList<T, Result, ID>> => {
    if (!results) return concatErrorCache([createTag(type, EBaseId.LIST)], error);

    let list: Result[];

    if ('data' in results) list = results.data;
    else list = results;

    return [
      createTag(type, EBaseId.LIST, {
        parentId: parentIdArgsKey ? args[parentIdArgsKey] : undefined,
      }),
      ...list.map(({ id }) => {
        const [item] = providesItem(type)({ data: { id } }, error, args);

        return item!;
      }),
    ];
  };

/**
 * HOF to create an entity cache to invalidate a LIST.
 *
 * Invalidates regardless of result.
 *
 * @example
 * ```ts
 * invalidatesList('Todo')
 * // [{ type: 'Todo', id: 'List' }]
 * ```
 */
export const invalidatesList =
  <T extends BASE_TAGS>(type: T | (T | { type: T; parentIdArgsKey: string })[], { parentIdArgsKey }: { parentIdArgsKey?: string } = {}) =>
  (results: any, error: FetchBaseQueryError | undefined, args: any): readonly CacheItem<T, EBaseId.LIST>[] => {
    if (Array.isArray(type))
      return type.map((item) => {
        if (typeof item === 'object')
          return createTag(item.type, EBaseId.LIST, {
            parentId: args[item.parentIdArgsKey],
          }) as CacheItem<T, EBaseId.LIST>;

        return createTag(item, EBaseId.LIST, {
          parentId: parentIdArgsKey ? args[parentIdArgsKey] : undefined,
        }) as CacheItem<T, EBaseId.LIST>;
      });

    return [
      createTag(type, EBaseId.LIST, {
        parentId: parentIdArgsKey ? args[parentIdArgsKey] : undefined,
      }) as CacheItem<T, EBaseId.LIST>,
    ];
  };

/**
 * HOF to create an entity cache for a single item using the query argument as the ID.
 *
 * @example
 * ```ts
 * providesItem('Todo')({ id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const providesItem =
  <T extends BASE_TAGS>(type: T) =>
  <Result extends { id: ID }, ID extends string | number>(
    result: IApiData<Result> | undefined,
    error: FetchBaseQueryError | undefined,
    args: any,
  ): readonly [CacheItem<T, Result['id']>] | readonly [BASE_TAGS.ERROR] => {
    if (!result) return concatErrorCache<T, ID>(undefined, error) as [BASE_TAGS.ERROR];

    let item: Result;

    if ('data' in result) item = result.data;
    else item = result;

    return [createTag(type, item.id) as CacheItem<T, Result['id']>] as const;
  };

/**
 * HOF to create an entity cache to invalidate a single item using the query argument as the ID.
 *
 * @example
 * ```ts
 * invalidatesItem('Todo')({ id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const invalidatesItem =
  <T extends BASE_TAGS>(type: T) =>
  <Result extends { id: ID }, ID extends string | number>(
    result: IApiData<Result> | undefined,
    error: FetchBaseQueryError | undefined,
    args: any,
  ): readonly [CacheItem<T, string | number>] | [] => {
    if (!result) return [];

    return [createTag(type, result.data?.id ?? '') as CacheItem<T, string | number>] as const;
  };

export const createTag = <T extends BASE_TAGS, ID extends string | number>(type: T, id?: ID, { parentId }: { parentId?: string } = {}) =>
  id ? ({ type, id: parentId ? `${id}-${parentId}` : (id as string) } as const) : type;

export const bytesToMegaBytes = (bytes: number) => bytes / 1024 ** 2;

export const addFileToFormData = (
  {
    file,
    description,
  }: {
    file?: File | IApiFile | string;
    description?: string;
  },
  key: string,
  formData: FormData,
) => {
  if (file && file instanceof File) {
    formData.append(`${key}`, file, file.name);
  }

  if (description) {
    formData.append(`description`, description);
  }
};
