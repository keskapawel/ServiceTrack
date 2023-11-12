import { createSelector, createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/store-hook';

import { IQuery } from 'models/Api';

import type { RootState } from './root-reducer';

export type TPageDataReducerState = {
  pageData: Record<string, IQuery>;
};

const initialState: TPageDataReducerState = {
  pageData: {},
};

const assignPageData = (state: Draft<TPageDataReducerState>, key: string, callback: (pageData: Draft<IQuery>) => void) => {
  if (!state.pageData[key]) {
    state.pageData[key] = {};
  }
  callback(state.pageData[key]);
};

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setPagination: (
      state,
      {
        payload: { key, pagination },
      }: PayloadAction<{
        key: string;
        pagination: IQuery['paginationQuery'];
      }>,
    ) => {
      assignPageData(state, key, (data) => {
        data.paginationQuery = pagination;
      });
    },

    setSort: (state, { payload: { key, sort } }: PayloadAction<{ key: string; sort: IQuery['sortQuery'] }>) => {
      assignPageData(state, key, (data) => {
        data.sortQuery = sort;
      });
    },
  },
});

const selectPageData = createSelector(
  (state: RootState) => state.pageData,
  (_: RootState, key: string) => key,
  (state, key): IQuery => {
    return state.pageData[key] ?? {};
  },
);

export const usePageDataSelector = (key: string) => useAppSelector((state) => selectPageData(state, key));

export const pageDataReducerName = pageDataSlice.name;
export const { setPagination, setSort } = pageDataSlice.actions;
export const pageDataReducer = pageDataSlice.reducer;
export default pageDataReducer;
