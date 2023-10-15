/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { ISIngleUser } from 'models/User';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import * as S from './styled';

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
];
