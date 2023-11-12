import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ISingleTicket } from 'models/Ticket';
import { useEffect } from 'react';

interface IProps {
  tickets?: ISingleTicket[];
  linkConstructor?: string;
}

const TicketsContainer = ({ tickets, linkConstructor }: IProps) => {
  const dispatch = useAppDispatch();

  const handleRowClick = (value: ISingleTicket) => {
    dispatch(setSelectedTicket({ selectedTicket: value }));
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
        linkConstructor={linkConstructor}
        lastCellBorder
        onRowClick={handleRowClick}
      />
    </>
  );
};
export default TicketsContainer;

// https://tanstack.com/table/v8/docs/examples/react/column-sizing
