import { Table } from 'components/common/Table';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store-hook';

import * as tableData from './constants';
import { IUser } from 'models/User';
import { EPageType } from 'pages/PageType';
import { setSelectedUser } from 'reducers/user-reducer';

const dummyData = [
  { id: 1, firstName: 'Damon', lastName: 'Alty', email: 'dalty0@etsy.com', createdAt: '9/6/2022', lastLogin: '3/29/2023' },
  { id: 2, firstName: 'Hakeem', lastName: 'Dincke', email: 'hdincke1@devhub.com', createdAt: '1/18/2023', lastLogin: '3/24/2023' },
  { id: 3, firstName: 'Estele', lastName: 'Floweth', email: 'efloweth2@amazon.de', createdAt: '8/5/2022', lastLogin: '9/10/2022' },
  { id: 4, firstName: 'Risa', lastName: 'Eccleston', email: 'reccleston3@liveinternet.ru', createdAt: '11/13/2022', lastLogin: '4/1/2023' },
  { id: 5, firstName: 'Trudie', lastName: 'Jedryka', email: 'tjedryka4@paginegialle.it', createdAt: '4/28/2022', lastLogin: '1/28/2023' },
  { id: 6, firstName: 'Niki', lastName: 'Sifleet', email: 'nsifleet5@blinklist.com', createdAt: '6/27/2022', lastLogin: '2/10/2023' },
  { id: 7, firstName: 'Trudie', lastName: 'Curtois', email: 'tcurtois6@friendfeed.com', createdAt: '10/6/2022', lastLogin: '4/2/2022' },
  { id: 8, firstName: 'Verge', lastName: 'Grier', email: 'vgrier7@foxnews.com', createdAt: '6/1/2023', lastLogin: '8/24/2022' },
  { id: 9, firstName: 'Bird', lastName: 'Stopforth', email: 'bstopforth8@google.co.jp', createdAt: '12/7/2022', lastLogin: '2/18/2023' },
  { id: 10, firstName: 'Mathe', lastName: 'Chyuerton', email: 'mchyuerton9@thetimes.co.uk', createdAt: '12/12/2021', lastLogin: '1/9/2023' },
];
// data from https://www.mockaroo.com/

export const ManageUsersContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const handleRowClick = (value: IUser) => {
    navigation(`/${EPageType.SETTINGS}/${EPageType.MANAGE_USERS}/${value.id}`);
    dispatch(setSelectedUser({ selectedUser: value }));
  };

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
