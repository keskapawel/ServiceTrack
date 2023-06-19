/* eslint-disable react/display-name */
import { memo } from 'react';
import { Column, CellProps } from 'react-table';

import { IUser } from 'models/User';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import * as S from './styled';

export const columns: Column<IUser>[] = [
  {
    Header: 'User name',
    id: 'name',
    border: 'right',
    accessor: (value) => value,
    Cell: memo(({ value: { firstName, lastName, id, picture } }: CellProps<IUser, IUser>) => (
      <S.UserNameWrapper>
        <Avatar id={id} picture={picture?.thumb} firstName={firstName} lastName={lastName} size={24} />
        <Typography ellipsis>
          {firstName}&nbsp;{lastName}
        </Typography>
      </S.UserNameWrapper>
    )),
    width: 216,
  },
];
