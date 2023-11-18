import { Typography } from 'components/common/Typography';
import { EOption, useLocationSelector } from 'reducers/location-reducer';
import { UserActions } from './components/UserActions';
import { TicketActions } from './components/TicketActions';
import { TicketsActions } from './components/TicketsActions';

import * as S from './styled';
import { Cancel } from './components/Cancel';
import { Save } from './components/Save';
import { UsersActions } from './components/UsersActions';
import { LoggedInUserActions } from './components/LoggedInUserActions';

export const ActionBar = () => {
  const { locationHeader, options, path } = useLocationSelector();

  return (
    <S.Wrapper id={'main'}>
      <Typography variant='h1' ellipsis tabIndex={-1}>
        {locationHeader}
      </Typography>
      <S.ButtonsContainer>
        {options.includes(EOption.Cancel) && <Cancel />}
        {options.includes(EOption.Save) && <Save />}

        {options.includes(EOption.UserActions) && <UserActions />}
        {options.includes(EOption.LoggedInUserActions) && <LoggedInUserActions />}
        {options.includes(EOption.UsersActions) && <UsersActions />}

        {options.includes(EOption.TicketActions) && <TicketActions />}
        {options.includes(EOption.TicketsActions) && <TicketsActions />}
      </S.ButtonsContainer>
    </S.Wrapper>
  );
};
