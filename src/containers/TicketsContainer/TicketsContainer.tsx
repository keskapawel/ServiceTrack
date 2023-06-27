import { dummyData } from './dummyData';
import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { EPageType } from 'pages/PageType';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ITicket } from 'models/Ticket';
import { useEffect } from 'react';

const TicketsContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleRowClick = (value: ITicket) => {
    navigation(`/${EPageType.TICKETS}/${value.id}`);
    dispatch(setSelectedTicket({ selectedTicket: value }));
  };

  useEffect(() => {
    dispatch(setSelectedTicket({ selectedTicket: null }));
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
export default TicketsContainer;
