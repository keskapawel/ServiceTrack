import { IMeta } from './Meta';

export interface IApiData<T> {
  data: T;
  timestamp?: string;
  statusCode?: number;
  status?: string;
  message?: string;
  reason?: string;
}

export interface IPaginationApiData<T> extends IApiData<T> {
  meta: IMeta;
}
