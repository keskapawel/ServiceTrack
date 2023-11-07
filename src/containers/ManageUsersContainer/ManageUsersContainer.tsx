import { Table } from 'components/common/Table';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import * as tableData from './constants';
import { ISIngleUser } from 'models/User';
import { EPageType } from 'pages/PageType';
import { setSelectedUser } from 'reducers/user-reducer';
import { useUsersQuery } from 'services/users';
import { useEffect } from 'react';

export const ManageUsersContainer = () => {
  const { data } = useUsersQuery({});

  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const handleRowClick = (value: ISIngleUser) => {
    navigation(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${value.uuid}`);
    dispatch(setSelectedUser({ selectedUser: value }));
  };

  useEffect(() => {
    dispatch(setSelectedUser({ selectedUser: undefined }));
  }, []);

  return (
    <>
      <Table
        columns={tableData.columns}
        enableSortBy
        data={data?.data.users.filter(({ uuid }) => uuid !== '00000000-0000-0000-0003-000000000001') ?? []}
        isLoading={false}
        itemIdAccessor={'id'}
        lastCellBorder
        redirectOnClick
        onRowClick={handleRowClick}
      />
    </>
  );
};
