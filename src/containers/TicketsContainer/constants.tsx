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

export const columns: Column<ISingleTicket>[] = [
  {
    Header: 'Ticket Id',
    id: 'id',
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
