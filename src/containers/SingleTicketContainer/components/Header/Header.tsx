import { Typography } from 'components/common/Typography';

import { EDateFormat, formatAppDate } from 'utils/common';

import * as S from './styled';
import { Status } from 'components/common/Status';

interface IProps {
  data: {
    createdAt?: Date | string;
    editedAt?: string;
    status: string;
    priority: string;
  };
}

export const Header = ({ data }: IProps) => {
  const { createdAt, editedAt, status, priority } = data;

  return (
    <S.Wrapper>
      <S.SingleItem>
        <Typography type='secondary'>Creation date:&nbsp;</Typography>
        <Typography>{formatAppDate(createdAt, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Last edit date:&nbsp;</Typography>
        <Typography>{formatAppDate(editedAt, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Status:&nbsp;</Typography>
        <Status status={status} />
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Priority:&nbsp;</Typography>
        <Status status={priority} />
      </S.SingleItem>
    </S.Wrapper>
  );
};
