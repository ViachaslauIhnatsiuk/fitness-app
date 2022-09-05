type CircleTimerProps = {
  duration: number;
  colors: { 0: `#${string}` } & { 1: `#${string}` } & `#${string}`[];
  colorsTime: number[];
  onClick: () => void;
  btnTitle: string;
  size: number;
  fontSize: number;
  strokeWidth: number;
  onUpdate: (remainigTime: number) => void;
  isTimerCanPause: boolean;
  playSound: (remainingTime: number) => void;
  trailColor: `#${string}`;
};

export type { CircleTimerProps };
