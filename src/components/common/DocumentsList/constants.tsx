/* eslint-disable react/display-name */
// import { memo } from 'react';
// import { Column } from 'react-table';

// import { IAttachment } from 'models/Document';
// import { EDateFormat, convertDate } from 'utils/common';

// import { Typography } from 'components/common/Typography';
// import { Status } from 'components/common/Status';
// import { Attachment } from 'components/common/Table/components';
// import { Number } from 'components/common/Table/components';

import { memo } from 'react';
import { Column, CellProps } from 'react-table';
import { Typography } from '../Typography';
import { IAttachmentTwo } from 'models/Document';
import { EDateFormat, convertDate, formatAppDate } from 'utils/common';
import { Attachment } from '../Table/components/Attachment/Attachment';

export enum DocumentsPageType {
  ITEM_DETAILS = 'item_details-oi-documents',
  ASSESSMENTS = 'assessments-oi-documents',
  GOODS_RECEIPTS = 'goodsReceipts-oi-documents',
}

export const columns: Column<IAttachmentTwo>[] = [
  {
    Header: 'Name',
    id: 'name',
    accessor: 'name',
    border: 'right',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value.slice().split('.').shift()}</Typography>),
    width: 280,
  },
  {
    Header: 'File',
    id: 'file',
    accessor: 'file',
    Cell: memo((props: CellProps) => (
      <Attachment
        showNa
        url={props.row.original.url}
        name={props.row.original.name}
        fileType={props.row.original.fileType}
        ticketId={props.row.original.objectId}
      />
    )),
    width: 340,
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: 'description',
    Cell: memo(({ value }: CellProps) => <Typography ellipsis>{value}</Typography>),
    width: 250,
  },
  {
    Header: 'Date added',
    id: 'creationDate',
    accessor: 'creationDate',
    Cell: memo(({ value }: CellProps) => <Typography showNa>{convertDate(value)}</Typography>),
  },
];
