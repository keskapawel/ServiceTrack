import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { EPageType } from 'pages/PageType';
import { useNavigate } from 'react-router-dom';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ISingleTicket } from 'models/Ticket';
import { useEffect } from 'react';

interface IProps {
  tickets?: ISingleTicket[];
}

const TicketsContainer = ({ tickets }: IProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleRowClick = (value: ISingleTicket) => {
    dispatch(setSelectedTicket({ selectedTicket: value }));
    // navigation(`/${EPageType.TICKETS}/${value.uuid}`);
  };

  useEffect(() => {
    dispatch(setSelectedTicket({ selectedTicket: undefined }));
  }, []);

  return (
    <>
      <Table
        columns={tableData.columns}
        data={tickets ?? []}
        isLoading={!tickets}
        itemIdAccessor={'uuid'}
        lastCellBorder
        // redirectOnClick
        onRowClick={handleRowClick}
        // openableOnRowClick
      />
    </>
  );
};
export default TicketsContainer;
