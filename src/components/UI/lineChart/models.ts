type LineChartProps = {
  positionLegend?: 'top' | 'bottom';
  title: string;
  labels: string[];
  data: LineChartDataType[];
};

type LineChartDataType = { x: string; y: number };

export type { LineChartProps };
