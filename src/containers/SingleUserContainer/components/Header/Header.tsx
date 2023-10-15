import { Typography } from 'components/common/Typography';

import { EDateFormat, formatAppDate } from 'utils/common';

import * as S from './styled';
import { Status } from 'components/common/Status';

interface IProps {
  data: {
    createdAt?: Date | null | string;
    lastLogin?: string | null;
    isEnabled?: string;
    isExpired?: string;
  };
}

export const Header = ({ data }: IProps) => {
  const { createdAt, lastLogin, isEnabled, isExpired } = data;

  return (
    <S.Wrapper>
      <S.SingleItem>
        <Typography type='secondary'>User added:&nbsp;</Typography>
        <Typography>{formatAppDate(createdAt, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Last login:&nbsp;</Typography>
        <Typography>{formatAppDate(lastLogin, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      {!!isEnabled && (
        <S.SingleItem>
          <Typography type='secondary'>Enabled:&nbsp;</Typography>
          <Status status={isEnabled} />
        </S.SingleItem>
      )}

      {!!isExpired && (
        <S.SingleItem>
          <Typography type='secondary'>Expired:&nbsp;</Typography>
          <Status status={isExpired} />
        </S.SingleItem>
      )}
    </S.Wrapper>
  );
};
