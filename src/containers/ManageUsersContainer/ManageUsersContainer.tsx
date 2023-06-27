import { Table } from 'components/common/Table';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import * as tableData from './constants';
import { IUser } from 'models/User';
import { EPageType } from 'pages/PageType';
import { setSelectedUser } from 'reducers/user-reducer';
import { useEffect } from 'react';
import { dummyData } from './dummyData';

export const ManageUsersContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const handleRowClick = (value: IUser) => {
    navigation(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${value.id}`);
    dispatch(setSelectedUser({ selectedUser: value }));
  };

  useEffect(() => {
    dispatch(setSelectedUser({ selectedUser: null }));
  }, []);

  return (
    <>
      <Table
        columns={tableData.columns}
        enableSortBy
        data={dummyData ?? []}
        isLoading={false}
        itemIdAccessor={'id'}
        lastCellBorder
        redirectOnClick
        onRowClick={handleRowClick}
      />
    </>
  );
};
