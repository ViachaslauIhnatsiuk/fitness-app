type AreaChartProps = {
  positionLegend: 'top' | 'bottom';
  title: string;
  labels: string[];
  data: AreaChartDataType[];
};

type AreaChartDataType = { x: string; y: number };

export type { AreaChartProps };
