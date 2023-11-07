import { useMemo } from 'react';

import { convertDate } from 'utils/common';

import { Avatar } from 'components/common/Avatar/Avatar';
import { Typography } from 'components/common/Typography';

import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';
import { IUploadFileResponse } from 'models/File';

import * as S from './styled';

interface IProps {
  user: {
    uuid: string;
    username: string;
    surname: string;
    photo?: IUploadFileResponse;
  };
  createdAt: string;
  systemActivity?: boolean;
  userActivity?: boolean;
}

export const Header = ({ user, createdAt, systemActivity, userActivity }: IProps) => {
  const { username, surname, uuid: userId, photo } = user || {};

  const getFormattedDate = useMemo(() => {
    return convertDate(createdAt);
  }, [createdAt]);

  return (
    <S.Wrapper>
      <S.DetailsContainer>
        {userActivity && (
          <>
            <Avatar picture={photo?.url} firstName={username} lastName={surname} id={userId} size={24} />
            <Details title={`${username} ${surname}`} />
          </>
        )}
        {systemActivity && (
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
