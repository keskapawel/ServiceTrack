import { Table } from 'components/common/Table';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import * as tableData from './constants';
import { ISIngleUser } from 'models/User';
import { EPageType } from 'reducers/location-reducer';
import { setSelectedUser } from 'reducers/user-reducer';
import { useUsersQuery } from 'services/users';
import { useCallback, useEffect } from 'react';
import { SortQuery } from 'models/Api';
import { setPagination, setSort, usePageDataSelector } from 'reducers/pageData-reducer';

export const ManageUsersContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const { sortQuery, paginationQuery } = usePageDataSelector(EPageType.MANAGE_USERS);

  const { data } = useUsersQuery({ paginationQuery, sortQuery });

  const handleRowClick = (value: ISIngleUser) => {
    navigation(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${value.uuid}`);
    dispatch(setSelectedUser({ selectedUser: value }));
  };

  const onChangeSort = useCallback(
    (sortBy?: SortQuery) => {
      dispatch(
        setSort({
          key: EPageType.MANAGE_USERS,
          sort: sortBy,
        }),
      );
    },
    [dispatch],
  );

  const onChangePage = useCallback((page: number) => {
    changePage(page);
  }, []);

  const changePage = useCallback(
    (page: number) => {
      dispatch(
        setPagination({
          key: EPageType.MANAGE_USERS,
          pagination: { page },
        }),
      );
    },
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changePage(1), []);

  return (
    <>
      <Table
        columns={tableData.columns}
        enableSortBy
        data={data?.data.users ?? []}
        isLoading={false}
        itemIdAccessor={'uuid'}
        lastCellBorder
        onChangeSort={onChangeSort}
        redirectOnClick
        onRowClick={handleRowClick}
        pagination={data?.meta}
        onPageChange={onChangePage}
        initialSortBy={sortQuery}
      />
    </>
  );
};
