import { Typography } from 'components/common/Typography';

import { formatAppDate } from 'utils/common';

import * as S from './styled';

interface IProps {
  data: {
    createdAt?: Date;
    lastLogin?: string;
  };
}

export const Header = ({ data }: IProps) => {
  const { createdAt, lastLogin } = data;

  return (
    <S.Wrapper>
      <S.SingleItem>
        <Typography type='secondary'>User added:&nbsp;</Typography>
        <Typography>{formatAppDate(createdAt)}</Typography>
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Last login:&nbsp;</Typography>
        <Typography>{formatAppDate(lastLogin)}</Typography>
      </S.SingleItem>
    </S.Wrapper>
  );
};