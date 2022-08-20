type CircleTimerProps = {
  duration: number;
  colors: { 0: `#${string}` } & { 1: `#${string}` } & `#${string}`[];
  colorsTime?: number[];
  isPlaying?: boolean;
  onClick?: () => void;
  btnTitle?: string;
};

export type { CircleTimerProps };
