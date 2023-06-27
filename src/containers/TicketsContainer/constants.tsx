/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ITicket } from 'models/Ticket';

import { Typography } from 'components/common/Typography';
import { Status } from 'components/common/Status';

export const columns: Column<ITicket>[] = [
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
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
  {
    Header: 'Subject',
    id: 'ticket_Subject',
    accessor: 'ticketSubject',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 320,
  },
  {
    Header: 'Status',
    id: 'ticket_status',
    accessor: 'ticketStatus',
    Cell: memo(({ value }: CellProps) => <Status status={value} />),
  },
  {
    Header: 'Priority',
    id: 'ticketPriority',
    accessor: 'ticketPriority',
    Cell: memo(({ value }: CellProps) => <Status status={value} />),
  },
  {
    Header: 'Creation date',
    id: 'ticket_created_date',
    accessor: 'ticketCreatedDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
  {
    Header: 'Last edit date',
    id: 'ticket_edit_date',
    accessor: 'ticketEditDate',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 220,
  },
];
