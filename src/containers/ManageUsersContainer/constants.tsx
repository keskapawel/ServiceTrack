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
    Cell: memo(({ value: { userName, surname, id, avatar } }: CellProps<ISIngleUser, ISIngleUser>) => {
      return (
        <S.UserNameWrapper>
          <Avatar id={id} picture={avatar?.url || undefined} firstName={userName} lastName={surname} size={24} />
          <Typography ellipsis>
            {userName}&nbsp;{surname}
          </Typography>
        </S.UserNameWrapper>
      );
    }),
    width: 216,
    redirectOnClick: true,
    order: 1,
  },
  {
    Header: 'Enabled',
    id: 'enabled',
    accessor: 'enabled',
    Cell: memo(({ value }: CellProps) => <Status status={String(value)} />),
    redirectOnClick: true,
    order: 2,
  },
  {
    Header: 'Expired',
    id: 'expired',
    accessor: 'expired',
    Cell: memo(({ value }: CellProps) => <Status status={String(value)} />),
    redirectOnClick: true,
    order: 3,
  },
  {
    Header: 'Roles',
    id: 'rules',
    accessor: 'rules',
    Cell: memo(({ value }: CellProps) => value?.map((item, index) => <Status key={index} status={item.name} />)),
    redirectOnClick: true,
    order: 4,
  },
];
