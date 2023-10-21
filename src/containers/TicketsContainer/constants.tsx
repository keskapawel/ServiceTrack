/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ISingleTicket } from 'models/Ticket';

import { Typography } from 'components/common/Typography';
import { Status } from 'components/common/Status';
import { formatDate } from 'utils/common';
import { Avatar } from 'components/common/Avatar';

export const columns: Column<ISingleTicket>[] = [
  {
    Header: 'Ticket Id',
    id: 'id',
    border: 'right',
    accessor: 'number',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>#{value}</Typography>),
    width: 100,
  },
  {
    Header: 'Title',
    id: 'title',
    accessor: 'title',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 200,
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: 'description',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
  {
    Header: 'Creator',
    id: 'customer',
    accessor: 'creator',
    Cell: memo(({ value }: CellProps) => {
      return <Avatar firstName={value.name} lastName={value.surname} id={value.id} extended picture={value?.photo?.url} />;
    }),
    width: 250,
  },
  {
    Header: 'Assigned to',
    id: 'assigned_to',
    accessor: 'assigned',
    Cell: memo(({ value }: CellProps) => {
      return <Avatar firstName={value.name} lastName={value.surname} id={value.id} extended picture={value?.photo?.url} />;
    }),
    width: 250,
  },
  {
    Header: 'Status',
    id: 'state',
    accessor: 'state',
    Cell: memo(({ value }: CellProps) => <Status status={value} />),
  },
  {
    Header: 'Priority',
    id: 'priority',
    accessor: 'priority',
    Cell: memo(({ value }: CellProps) => <Status status={value} />),
  },
  {
    Header: 'Creation date',
    id: 'creation_date',
    accessor: 'creationDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{formatDate(value)}</Typography>),
    width: 220,
  },
  {
    Header: 'Last edit date',
    id: 'edit_date',
    accessor: 'LastModificationDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{formatDate(value)}</Typography>),
    width: 220,
  },
];
