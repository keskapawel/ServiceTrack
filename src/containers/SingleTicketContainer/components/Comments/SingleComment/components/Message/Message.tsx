import { Typography } from 'components/common/Typography';

import * as S from './styled';

interface IProps {
  message: string;
}

export const Message = ({ message }: IProps) => {
  return (
    <S.Wrapper>
      <Typography>{message}</Typography>
    </S.Wrapper>
  );
};
