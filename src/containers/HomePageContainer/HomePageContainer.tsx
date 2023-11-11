import { Icon } from 'components/common/Icon';
import * as S from './styled';
import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import { EPageType } from 'reducers/location-reducer';
import { TicketsContainer } from 'containers/TicketsContainer';
import { useGetUserTicketsQuery } from 'services/tickets';
import { useAuthUserSelector } from 'reducers/auth-reducer';

const dummyData = [
  {
    name: 'Tickets',
    id: '1',
    icon: 'ClipboardIcon',
    link: `${EPageType.TICKETS}`,
    description: 'Another day in paradise...',
  },
  {
    name: 'Settings',
    id: '2',
    icon: 'AdjustmentsIcon',
    link: `${EPageType.SETTINGS}`,
    description: 'Adjust settings',
  },
];

export const HomePageContainer = () => {
  const { uuid } = useAuthUserSelector();
  const { data } = useGetUserTicketsQuery({ id: uuid });
  return (
    <S.Wrapper>
      <S.BoxesWrapper>
        {dummyData.map(({ name, id, icon, link, description }) => (
          <SettingsBox
            title={name}
            description={description ?? 'Lorem Ipsum...'}
            key={id}
            icon={<Icon icon={icon} color={'none'} outline size={24} />}
            redirectTo={link && link}
          />
        ))}
      </S.BoxesWrapper>
      <S.TicketListWrapper>
        <S.TicketListHeader>Your tickets</S.TicketListHeader>
        <TicketsContainer tickets={data?.data.tickets} linkConstructor={EPageType.TICKETS} />
      </S.TicketListWrapper>
    </S.Wrapper>
  );
};
