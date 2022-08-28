const normalizeRangeItems = (startValue: number, step: number, maxValue: number): number[] => {
  const left = startValue + 1;

  let right: number;
  if (startValue + step <= maxValue) {
    right = startValue + step;
  } else {
    right = maxValue;
  }

  return [left, right];
};

export { normalizeRangeItems };
