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

export interface SortQuery {
  sortField: string;
  desc: true | false;
}
export enum ESortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
export interface PaginationQuery {
  page: number;
}

export interface IQuery {
  paginationQuery?: PaginationQuery;
  sortQuery?: SortQuery;
  pagination?: boolean;
}
