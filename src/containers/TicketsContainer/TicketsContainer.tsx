import * as tableData from './constants';
import { Table } from 'components/common/Table';
import { useAppDispatch } from 'hooks/store-hook';
import { setSelectedTicket } from 'reducers/ticket-reducer';
import { ISingleTicket, SubscribeMethod } from 'models/Ticket';
import { useCallback, useEffect, useMemo } from 'react';
import { SortQuery } from 'models/Api';
import { EPageType } from 'reducers/location-reducer';
import { setPagination, setSort } from 'reducers/pageData-reducer';
import { IMeta } from 'models/Meta';
import { useManageSubscribtionMutation } from 'services/tickets';
import { useAuthUserSelector } from 'reducers/auth-reducer';
import { AlertVariants, AlertMessages } from 'components/common/PopupAlert';
import { showAlertPopup } from 'reducers/popup-alert-reducer';

interface IProps {
  tickets?: ISingleTicket[];
  linkConstructor?: string;
  meta?: IMeta;
  initialSortBy?: SortQuery;
  isLoading?: boolean;
}

const TicketsContainer = ({ tickets, linkConstructor, meta, initialSortBy, isLoading }: IProps) => {
  const { uuid } = useAuthUserSelector();
  const [manageSubscribtion, { isSuccess: isManageSubSuccess, error: isManageSubError }] = useManageSubscribtionMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isManageSubSuccess) {
      dispatch(showAlertPopup({ variant: AlertVariants.SUCCESS, message: AlertMessages.SAVED }));
    }
    if (isManageSubError) {
      dispatch(showAlertPopup({ variant: AlertVariants.ERROR, message: AlertMessages.ERROR }));
    }
  }, [dispatch, isManageSubError, isManageSubSuccess]);

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

  const onSelect = useCallback(
    (id: string, option: tableData.EModalType) => {
      if (option === tableData.EModalType.TURN_ON_NOTIFICATIONS) {
        manageSubscribtion({ ticketId: id, userId: uuid, applyMethod: SubscribeMethod.SUBSCRIBE });
      }
      if (option === tableData.EModalType.TURN_OFF_NOTIFICATIONS) {
        manageSubscribtion({ ticketId: id, userId: uuid, applyMethod: SubscribeMethod.UNSUBSCRIBE });
      }
    },
    [manageSubscribtion, uuid],
  );

  const handleItemSelect = useCallback((modalType: tableData.EModalType) => (id: string) => onSelect(id, modalType), [onSelect]);

  const availableMenuOptions = useMemo(() => tableData.createMenuItems(tableData.availableMenuOptions, handleItemSelect), [handleItemSelect]);

  return (
    <>
      <Table
        columns={tableData.columns}
        data={tickets ?? []}
        isLoading={isLoading && !tickets}
        itemIdAccessor={'uuid'}
        linkConstructor={linkConstructor}
        initialSortBy={initialSortBy}
        enableSortBy
        pagination={meta}
        onPageChange={onChangePage}
        onRowClick={handleRowClick}
        onChangeSort={onChangeSort}
        pageDataKey={EPageType.TICKETS}
        menuOptions={availableMenuOptions}
      />
    </>
  );
};
export default TicketsContainer;

// https://tanstack.com/table/v8/docs/examples/react/column-sizing
// https://tanstack.com/table/v8/docs/examples/react/column-dnd
// https://tanstack.com/table/v8/docs/examples/react/column-visibility
