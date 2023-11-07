import { Typography } from 'components/common/Typography';

import { EDateFormat, formatAppDate } from 'utils/common';

import * as S from './styled';
import { Status } from 'components/common/Status';

interface IProps {
  data: {
    creationDate?: Date | null | string;
    lastLogin?: string | null;
    enabled?: string;
    expired?: string;
  };
}

export const Header = ({ data }: IProps) => {
  const { creationDate, lastLogin, enabled, expired } = data;

  return (
    <S.Wrapper>
      <S.SingleItem>
        <Typography type='secondary'>User added:&nbsp;</Typography>
        <Typography>{formatAppDate(creationDate, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      <S.SingleItem>
        <Typography type='secondary'>Last login:&nbsp;</Typography>
        <Typography>{formatAppDate(lastLogin, EDateFormat.YEAR)}</Typography>
      </S.SingleItem>

      {!!enabled && (
        <S.SingleItem>
          <Typography type='secondary'>Enabled:&nbsp;</Typography>
          <Status status={enabled} />
        </S.SingleItem>
      )}

      {!!expired && (
        <S.SingleItem>
          <Typography type='secondary'>Expired:&nbsp;</Typography>
          <Status status={expired} />
        </S.SingleItem>
      )}
    </S.Wrapper>
  );
};
