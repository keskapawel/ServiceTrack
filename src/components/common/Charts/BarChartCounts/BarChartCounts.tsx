import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { memo, useMemo } from 'react';
import * as S from './styled';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  data: {
    chart: { name: string; headers: string[]; data: number[]; analiseDateTime: string };
    lineLabel?: string;
    backgroundColor?: string[];
    fill?: boolean;
  }[];
  height?: number | string;
}

export const Component = ({ data, height }: ChartProps) => {
  const formatData = useMemo(() => {
    if (data?.[0]?.chart?.headers)
      return {
        labels: data[0].chart.headers ?? [],
        datasets: data.map((item) => ({
          label: item.lineLabel,
          fill: item.fill,
          data: item.chart.data,
          backgroundColor: item?.backgroundColor,
        })),
      };
    return {};
  }, [data]);

  return (
    <S.Wrapper>
      {formatData?.labels && formatData?.labels?.length > 0 && (
        <Bar
          redraw={false}
          key={'chart-counts'}
          id={'chart-counts'}
          data={formatData}
          height={height}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                beginAtZero: true,
              },
            },
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                display: false,
                position: 'top' as const,
              },
              title: {
                display: false,
                text: 'User activity in last week',
              },
            },
          }}
        />
      )}
    </S.Wrapper>
  );
};

Component.displayName = 'BarChartCounts';

export const BarChartCounts = memo(Component);
