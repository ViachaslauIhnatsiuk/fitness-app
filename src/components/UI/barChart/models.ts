type BarChartProps = {
  positionLegend: 'top' | 'bottom';
  title: string;
  labels: string[];
  data: BarChartDataType[];
  color: string;
  borderColor: string;
  maxMin: number[];
};

type BarChartDataType = { x: string; y: number };

export type { BarChartProps };
