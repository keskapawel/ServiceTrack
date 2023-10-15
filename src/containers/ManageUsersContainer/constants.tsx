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
    Cell: memo(({ value: { name, surname, id, picture } }: CellProps<ISIngleUser, ISIngleUser>) => (
      <S.UserNameWrapper>
        <Avatar id={id} picture={picture?.thumb} firstName={name} lastName={surname} size={24} />
        <Typography ellipsis>
          {name}&nbsp;{surname}
        </Typography>
      </S.UserNameWrapper>
    )),
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
    id: 'roles',
    accessor: 'roles',
    Cell: memo(({ value }: CellProps) => value[0]?.modules?.map((module, index) => <Status key={index} status={module?.name} />)),
  },
];
