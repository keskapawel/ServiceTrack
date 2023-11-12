export interface IMeta {
  pageInfo: PageInfo;
}

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sorted: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
}
