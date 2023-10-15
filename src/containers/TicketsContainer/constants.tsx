/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ISingleTicket } from 'models/Ticket';

import { Typography } from 'components/common/Typography';
import { Status } from 'components/common/Status';

export const columns: Column<ISingleTicket>[] = [
  {
    Header: 'Ticket Id',
    id: 'id',
    border: 'right',
    accessor: 'id',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
  },
  {
    Header: 'User',
    id: 'customer_name',
    accessor: 'customerName',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value ?? 'Lorem Ipsum'}</Typography>),
    width: 180,
  },
  {
    Header: 'Title',
    id: 'title',
    accessor: 'title',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 150,
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: 'description',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
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
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
  {
    Header: 'Last edit date',
    id: 'edit_date',
    accessor: 'editDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
];
