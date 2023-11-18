import { useUserSelector } from 'reducers/user-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from 'services/users';
import { isLoadingByStatusCode } from 'hooks/statusCode-hooks';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGeneralUserActivityCountsQuery, useGeneralUserActivityInPeriodQuery } from 'services/analiticsData';
import { formatDate, EDateType } from 'utils/common';
import { ActivityChartInPeriod } from 'components/common/Charts';
import { graphColorPalette } from 'styles/palette';
import * as S from './styled';
import { BarChartCounts } from 'components/common/Charts/BarChartCounts';

interface IProps {
  createNew?: boolean;
  showAnalitics?: boolean;
}

export const SingleUserContainer = ({ createNew, showAnalitics = true }: IProps) => {
  const { selectedUser } = useUserSelector();
  const { id } = useParams();
  const { data } = useGetSingleUserQuery(!createNew ? { id: id ?? selectedUser?.uuid ?? '' } : skipToken);

  const { data: generalUserActivityInPeriodChartData } = useGeneralUserActivityInPeriodQuery({
    userId: selectedUser?.uuid ?? id ?? data?.data.user.uuid ?? '',
    endDate: formatDate(new Date().setDate(new Date().getDate() + 1), EDateType.YYMMDD) ?? '',
    startDate: formatDate(new Date().setDate(new Date().getDate() - 7), EDateType.YYMMDD) ?? '',
  });

  const { data: generalUserActivityCountsChartData } = useGeneralUserActivityCountsQuery({
    userId: selectedUser?.uuid ?? id ?? data?.data.user.uuid ?? '',
  });

  const isLoading = isLoadingByStatusCode(data?.status);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {!createNew && (
        <Header
          data={{
            creationDate: data?.data.user?.creationDate,
            lastLogin: data?.data.user?.lastLoginDateTime,
            enabled: String(data?.data.user?.enabled),
            expired: String(data?.data.user?.expired),
          }}
        />
      )}
      <MainSection data={createNew ? undefined : data?.data.user ?? selectedUser} createNewMode={createNew} />
      {showAnalitics && !createNew && (
        <>
          <S.UserActivityHeader>User activity</S.UserActivityHeader>
          <S.ChartWrapper>
            {generalUserActivityInPeriodChartData?.data && generalUserActivityInPeriodChartData?.data?.multiChart?.dataSets?.length > 0 && (
              <>
                <S.SingleChart>
                  <ActivityChartInPeriod
                    data={generalUserActivityInPeriodChartData?.data.multiChart.dataSets.map((item, index) => ({
                      chart: item,
                      lineLabel: `User activity on ${item?.name?.split('(')?.at(-1)?.split(')')?.at(0) ?? 'Dataset'}`,
                      borderColor: graphColorPalette[index],
                      backgroundColor: graphColorPalette[index],
                      fill: false,
                    }))}
                  />
                </S.SingleChart>
              </>
            )}
            {generalUserActivityCountsChartData?.data && generalUserActivityCountsChartData?.data?.chart?.data?.length > 0 && (
              <S.SingleChart>
                <BarChartCounts
                  data={[
                    {
                      chart: generalUserActivityCountsChartData?.data.chart,
                      lineLabel: 'Tickets activity',
                      backgroundColor: graphColorPalette,
                      fill: false,
                    },
                  ]}
                />
              </S.SingleChart>
            )}
          </S.ChartWrapper>
        </>
      )}
    </>
  );
};
