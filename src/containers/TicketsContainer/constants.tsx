/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ISingleTicket } from 'models/Ticket';

import { Typography } from 'components/common/Typography';
import { Status } from 'components/common/Status';
import { formatDate } from 'utils/common';
import { Avatar } from 'components/common/Avatar';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from 'utils/constants';
import { EPageType } from 'reducers/location-reducer';
import { EFieldType } from 'components/common/Status/constants';
import { TableMenuOption } from 'components/common/Table';
import { Icon } from 'components/common/Icon';

export const columns: Column<ISingleTicket>[] = [
  {
    Header: 'Ticket Id',
    id: 'ID',
    border: 'right',
    accessor: 'id',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>#{value}</Typography>),
    width: 130,
    redirectOnClick: true,
    order: 1,
  },
  {
    Header: 'Title',
    id: 'title',
    accessor: 'title',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 200,
    redirectOnClick: true,
    order: 2,
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: 'description',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
    redirectOnClick: true,
    order: 3,
  },
  {
    Header: 'Creator',
    id: 'creator',
    accessor: 'creator',
    Cell: memo(({ value }: CellProps) => {
      return <Avatar firstName={value.name} lastName={value.surname} id={value.id} extended picture={value?.avatar?.url} />;
    }),
    width: 250,
    redirectOnClick: true,
    order: 4,
  },
  {
    Header: 'Assigned to',
    id: 'assigned',
    accessor: 'assigned',
    Cell: memo(({ value }: CellProps) => {
      return <Avatar firstName={value.name} lastName={value.surname} id={value.id} extended picture={value?.avatar?.url} />;
    }),
    width: 250,
    redirectOnClick: true,
    order: 5,
  },
  {
    Header: 'Status',
    id: 'state',
    accessor: 'state',
    Cell: memo((props: CellProps) => {
      return (
        <Status
          status={props.row.original.state}
          changeEnable
          options={STATUS_OPTIONS}
          changableId={props.row.original.uuid}
          type={EPageType.TICKETS}
          field={EFieldType.STATE}
        />
      );
    }),
    redirectOnClick: false,
    width: 200,
    order: 6,
  },
  {
    Header: 'Priority',
    id: 'priority',
    accessor: 'priority',
    Cell: memo((props: CellProps) => {
      return (
        <Status
          status={props.row.original.priority}
          changeEnable
          options={PRIORITY_OPTIONS}
          changableId={props.row.original.uuid}
          type={EPageType.TICKETS}
          field={EFieldType.PRIORITY}
        />
      );
    }),
    redirectOnClick: false,
    width: 200,
    order: 7,
  },
  {
    Header: 'Creation date',
    id: 'creationDate',
    accessor: 'creationDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{formatDate(value)}</Typography>),
    width: 220,
    redirectOnClick: true,
    order: 8,
  },
  {
    Header: 'Last edit date',
    id: 'lastModificationDate',
    accessor: 'lastModificationDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{formatDate(value)}</Typography>),
    width: 220,
    redirectOnClick: true,
    order: 9,
  },
];

export type TMenuOptions = {
  turnOnNotifications?: boolean;
  turnoffNotifications?: boolean;
};

export const availableMenuOptions: TMenuOptions = {
  turnOnNotifications: true,
  turnoffNotifications: true,
};

export enum EModalType {
  TURN_ON_NOTIFICATIONS = 'TurnOnNotifications',
  TURN_OFF_NOTIFICATIONS = 'TurnOffNotifications',
}

export const createMenuItems =
  (options: TMenuOptions, callback: (modal: EModalType) => (id: string) => void) =>
  (ticketData: ISingleTicket): TableMenuOption<ISingleTicket, string>[] => {
    const menu: TableMenuOption<ISingleTicket, string>[] = [];

    const notificationObject = ticketData.currentUserSubscribed
      ? {
          clickHandler: callback(EModalType.TURN_OFF_NOTIFICATIONS),
          label: 'Turn off notifications for this ticket',
          icon: <Icon icon='BellIcon' />,
        }
      : {
          clickHandler: callback(EModalType.TURN_ON_NOTIFICATIONS),
          label: 'Turn on notifications for this ticket',
          icon: <Icon icon='BellIcon' />,
        };

    if (options.turnOnNotifications) menu.push({ ...notificationObject });

    return menu.length ? menu : [];
  };
