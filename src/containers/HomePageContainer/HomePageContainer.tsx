import { Icon } from 'components/common/Icon';
import * as S from './styled';
import { SettingsBox } from 'components/common/SettingsBox/SettingsBox';
import { EPageType } from 'reducers/location-reducer';
import { TicketsContainer } from 'containers/TicketsContainer';
import { useGetUserFollowingTicketsQuery, useGetUserTicketsQuery } from 'services/tickets';
import { useAuthUserSelector } from 'reducers/auth-reducer';
import { usePageDataSelector } from 'reducers/pageData-reducer';
import { ActivityChartInPeriod } from 'components/common/Charts';
import { useGetUserActivityCountrInPeriodQuery } from 'services/analiticsData';
import { EActivityType } from 'models/AnaliticsData';
import { EDateType, formatDate } from 'utils/common';
import { colors, graphColorPalette } from 'styles/palette';

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
  const { sortQuery, paginationQuery } = usePageDataSelector(EPageType.TICKETS);
  const { uuid } = useAuthUserSelector();
  const { data, isLoading } = useGetUserTicketsQuery({ id: uuid, sortQuery, paginationQuery });
  const { data: userFollowingTickets, isLoading: isUserFollowingTicketsLoading } = useGetUserFollowingTicketsQuery({
    id: uuid,
    sortQuery,
    paginationQuery,
  });
  const { data: chartDataTicket } = useGetUserActivityCountrInPeriodQuery({
    userId: uuid,
    contentType: EActivityType.TICKET,
    endDate: formatDate(new Date().setDate(new Date().getDate() + 1), EDateType.YYMMDD) ?? '',
    startDate: formatDate(new Date().setDate(new Date().getDate() - 7), EDateType.YYMMDD) ?? '',
  });
  const { data: chartDataComment } = useGetUserActivityCountrInPeriodQuery({
    userId: uuid,
    contentType: EActivityType.COMMENT,
    endDate: formatDate(new Date().setDate(new Date().getDate() + 1), EDateType.YYMMDD) ?? '',
    startDate: formatDate(new Date().setDate(new Date().getDate() - 7), EDateType.YYMMDD) ?? '',
  });
  const { data: chartDataAll } = useGetUserActivityCountrInPeriodQuery({
    userId: uuid,
    contentType: EActivityType.ALL,
    endDate: formatDate(new Date().setDate(new Date().getDate() + 1), EDateType.YYMMDD) ?? '',
    startDate: formatDate(new Date().setDate(new Date().getDate() - 7), EDateType.YYMMDD) ?? '',
  });

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
        <TicketsContainer
          isLoading={isLoading}
          tickets={data?.data.tickets}
          linkConstructor={EPageType.TICKETS}
          meta={data?.meta}
          initialSortBy={sortQuery}
        />
      </S.TicketListWrapper>
      <S.TicketListWrapper>
        <S.TicketListHeader>Tickets you are following</S.TicketListHeader>
        <TicketsContainer
          isLoading={isUserFollowingTicketsLoading}
          tickets={userFollowingTickets?.data.tickets}
          linkConstructor={EPageType.TICKETS}
          meta={data?.meta}
          initialSortBy={sortQuery}
        />
      </S.TicketListWrapper>
      {chartDataTicket?.data.chart && chartDataComment?.data.chart && chartDataAll?.data.chart && (
        <S.ChartsWrapper>
          <S.TicketListHeader>Your activity</S.TicketListHeader>
          <ActivityChartInPeriod
            data={[
              {
                chart: chartDataTicket?.data.chart,
                lineLabel: 'Tickets activity',
                borderColor: graphColorPalette[0],
                backgroundColor: graphColorPalette[0],
                fill: false,
              },
              {
                chart: chartDataComment?.data.chart,
                lineLabel: 'Comments',
                borderColor: graphColorPalette[4],
                backgroundColor: graphColorPalette[4],
                fill: false,
              },
              {
                chart: chartDataAll?.data.chart,
                lineLabel: 'Whole activity',
                borderColor: graphColorPalette[3],
                backgroundColor: graphColorPalette[3],
                fill: false,
              },
            ]}
            height={70}
          />
        </S.ChartsWrapper>
      )}
    </S.Wrapper>
  );
};
