/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ISIngleUser } from 'models/User';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import * as S from './styled';
import { Status } from 'components/common/Status';

export const columns: Column<ISIngleUser>[] = [
  {
    Header: 'User name',
    id: 'name',
    border: 'right',
    accessor: (value) => value,
    Cell: memo(({ value: { userName, surname, id, file } }: CellProps<ISIngleUser, ISIngleUser>) => {
      return (
        <S.UserNameWrapper>
          <Avatar id={id} picture={file?.url || undefined} firstName={userName} lastName={surname} size={24} />
          <Typography ellipsis>
            {userName}&nbsp;{surname}
          </Typography>
        </S.UserNameWrapper>
      );
    }),
    width: 216,
  },
  {
    Header: 'Enabled',
    id: 'isEnabled',
    accessor: 'isEnabled',
    Cell: memo(({ value }: CellProps) => <Status status={String(value)} />),
  },
  {
    Header: 'Expired',
    id: 'isExpired',
    accessor: 'isExpired',
    Cell: memo(({ value }: CellProps) => <Status status={String(value)} />),
  },
  {
    Header: 'Roles',
    id: 'rules',
    accessor: 'rules',
    Cell: memo(({ value }: CellProps) => value?.map((item, index) => <Status key={index} status={item.name} />)),
  },
];
