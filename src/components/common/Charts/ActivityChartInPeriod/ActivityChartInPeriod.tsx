import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { memo, useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);
interface ChartProps {
  data: {
    chart: { name: string; headers: string[]; data: number[]; analiseDateTime: string };
    lineLabel?: string;
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
  height?: number | string;
}

export const Component = ({ data = [], height }: ChartProps) => {
  const formatData = useMemo(() => {
    if (data?.[0]?.chart?.headers)
      return {
        labels: data[0].chart.headers ?? [],
        datasets: data.map((item) => ({
          label: item.lineLabel,
          fill: item.fill,
          data: item.chart.data,
          backgroundColor: item.backgroundColor,
          borderColor: item.borderColor,
        })),
      };
    return {};
  }, [data]);

  return (
    <div>
      {formatData?.labels && formatData?.labels?.length > 0 && (
        <Line
          redraw={false}
          key={'chart-in-period'}
          hidden={!formatData}
          id={'chart-in-period'}
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
    </div>
  );
};

Component.displayName = 'ActivityChartInPeriod';

export const ActivityChartInPeriod = memo(Component);
