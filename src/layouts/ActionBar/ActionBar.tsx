import { Typography } from 'components/common/Typography';
import { EOption, useLocationSelector } from 'reducers/location-reducer';
import { UserActions } from './components/UserActions';

import * as S from './styled';

export const ActionBar = () => {
  const { locationHeader, options, path } = useLocationSelector();
  return (
    <S.Wrapper id={'main'}>
      <Typography variant='h1' ellipsis tabIndex={-1}>
        {locationHeader}
      </Typography>
      <S.ButtonsContainer>{options.includes(EOption.UserActions) && <UserActions />}</S.ButtonsContainer>
    </S.Wrapper>
  );
};
