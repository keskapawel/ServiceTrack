import { useMemo } from 'react';

import { convertDate } from 'utils/common';

// import { ECommentTypes, IComment } from 'models/Comment';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';
import * as S from './styled';
import { ECommentTypes } from 'models/Comment';

// type TProps = Pick<IComment, 'user' | 'createdAt' | 'id' | 'parentObject' | 'source'>;
interface IProps {
  user: any;
  createdAt: any;
  parentObject: any;
  source: any;
  id: any;
}

export const Header = ({ user, createdAt, parentObject, source }: IProps) => {
  const { firstName, lastName, picture, id: userId } = user || {};
  // const { label } = parentObject;
  const label = 'xd';

  const getFormattedDate = useMemo(() => {
    return convertDate(createdAt);
  }, [createdAt]);

  return (
    <S.Wrapper>
      <S.DetailsContainer>
        {source === ECommentTypes.USER && (
          <>
            <Avatar picture={picture?.thumb} firstName={firstName} lastName={lastName} id={userId} size={24} />
            <Details title={`${firstName} ${lastName}`} />
          </>
        )}
        {source === ECommentTypes.SYSTEM && (
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
