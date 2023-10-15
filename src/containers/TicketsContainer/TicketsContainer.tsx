import { IDummyData, dummyData } from './dummyData';
import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { EPageType } from 'pages/PageType';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ISingleTicket, ITicket } from 'models/Ticket';
import { useEffect } from 'react';
import { useTicketsQuery } from 'services/tickets';

interface IProps {
  tickets?: ISingleTicket[];
}

const TicketsContainer = ({ tickets }: IProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleRowClick = (value: ISingleTicket) => {
    dispatch(setSelectedTicket({ selectedTicket: value }));
    navigation(`/${EPageType.TICKETS}/${value.id}`);
  };

  // useEffect(() => {
  //   dispatch(setSelectedTicket({ selectedTicket: null }));
  // }, []);
  console.log(tickets, 'tickets');
  return (
    <>
      <Table
        columns={tableData.columns}
        data={tickets ?? []}
        isLoading={!tickets}
        itemIdAccessor={'id'}
        lastCellBorder
        redirectOnClick
        onRowClick={handleRowClick}
      />
    </>
  );
};
export default TicketsContainer;
