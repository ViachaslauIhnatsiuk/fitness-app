type CircleTimerProps = {
  duration: number;
  colors?: { 0: `#${string}` } & { 1: `#${string}` } & `#${string}`[];
  colorsTime?: number[];
  onClick?: () => void;
  btnTitle?: string;
  size?: number;
  fontSize?: number;
  strokeWidth?: number;
};

export type { CircleTimerProps };
