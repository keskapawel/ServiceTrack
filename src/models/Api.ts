import { IMeta } from './Meta';

export interface IApiData<T> {
  data: T;
}

export interface IPaginationApiData<T> extends IApiData<T> {
  meta: IMeta;
}

export interface IQuery {
}