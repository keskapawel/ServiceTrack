import { useMemo } from 'react';

import { convertDate } from 'utils/common';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';
import * as S from './styled';
import { EActivityType, EClassType } from 'models/Activity';

interface IProps {
  user: {
    id: string;
    username: string;
    surname: string;
  };
  createdAt: string;
  source: EActivityType;
  id: string;
  $className: EClassType;
}

export const Header = ({ user, createdAt, $className }: IProps) => {
  const { username, surname, id: userId } = user || {};

  const getFormattedDate = useMemo(() => {
    return convertDate(createdAt);
  }, [createdAt]);

  return (
    <S.Wrapper>
      <S.DetailsContainer>
        {$className === EClassType.COMMENT && (
          <>
            <Avatar picture={''} firstName={username} lastName={surname} id={userId} size={24} />
            <Details title={`${username} ${surname}`} />
          </>
        )}
        {$className === EClassType.TICKET && (
          <S.NoImageWrapper>
            <Details title={'System'} />
          </S.NoImageWrapper>
        )}
      </S.DetailsContainer>
      <Typography color={palette.baseColor} sx={{ fontSize: fontSize[12] }}>
        {getFormattedDate}
      </Typography>
    </S.Wrapper>
  );
};

interface IDetailsProps {
  title: string;
}

const Details = ({ title }: IDetailsProps) => {
  return (
    <S.Details>
      <Typography color={palette.dark}>{title}</Typography>
    </S.Details>
  );
};
