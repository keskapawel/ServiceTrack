export interface IChartData {
  chart: IChart;
}
export interface IMultiChartData {
  multiChart: IMultiChart;
}

export interface IMultiChart {
  name: string;
  headers: string[];
  dataSets: IChart[];
  analiseDateTime: string;
  type: string;
  analiseType: string;
}
export interface IChart {
  name: string;
  headers: string[];
  data: number[];
  analiseDateTime: string;
  type: string;
  analiseType: string;
}

export enum EActivityType {
  TICKET = 'TICKET',
  COMMENT = 'COMMENT',
  ALL = 'ALL',
}

export interface IAllUserActivity {
  labels: string[];
  datasets: Datasets[];
}

export interface Datasets {
  label: string;
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  data: number[];
}
