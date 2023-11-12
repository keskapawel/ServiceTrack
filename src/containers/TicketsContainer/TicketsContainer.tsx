import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ISingleTicket } from 'models/Ticket';
import { useCallback, useEffect } from 'react';
import { SortQuery } from 'models/Api';
import { EPageType } from 'reducers/location-reducer';
import { setPagination, setSort, usePageDataSelector } from 'reducers/pageData-reducer';
import { IMeta, PageInfo } from 'models/Meta';

interface IProps {
  tickets?: ISingleTicket[];
  linkConstructor?: string;
  meta?: IMeta;
  initialSortBy?: SortQuery;
}

const TicketsContainer = ({ tickets, linkConstructor, meta, initialSortBy }: IProps) => {
  const dispatch = useAppDispatch();

  const handleRowClick = (value: ISingleTicket) => {
    dispatch(setSelectedTicket({ selectedTicket: value }));
  };

  useEffect(() => {
    dispatch(setSelectedTicket({ selectedTicket: undefined }));
  }, []);

  const onChangeSort = useCallback(
    (sortBy?: SortQuery) => {
      dispatch(
        setSort({
          key: EPageType.TICKETS,
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
          key: EPageType.TICKETS,
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
        data={tickets ?? []}
        isLoading={!tickets}
        itemIdAccessor={'uuid'}
        linkConstructor={linkConstructor}
        lastCellBorder
        initialSortBy={initialSortBy}
        enableSortBy
        pagination={meta}
        onPageChange={onChangePage}
        onRowClick={handleRowClick}
        onChangeSort={onChangeSort}
        pageDataKey={EPageType.TICKETS}
      />
    </>
  );
};
export default TicketsContainer;

// https://tanstack.com/table/v8/docs/examples/react/column-sizing
