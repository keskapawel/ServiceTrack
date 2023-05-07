import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query';

export type TApiError = {
  status: number;
  data: { error: string };
};

export type TDeviseError = {
  status: number;
  data: { errors: Record<string, string[]> };
};

export type TBaseQueryFunc = BaseQueryFn<string | FetchArgs, unknown, TApiError, unknown, { request: Request; response: Response }>;

export type TBaseQueryWithResult = TBaseQueryFunc extends (...a: infer U) => infer R
  ? (defaultResult: ReturnType<TBaseQueryFunc>, ...a: U) => R
  : never;

export type TRequestError = SerializedError | TApiError | undefined;

export enum EBaseId {
  LIST = 'LIST',
}
