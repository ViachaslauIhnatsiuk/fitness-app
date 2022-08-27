const addPercentage = (value: number, multiplier: number): number =>
  Math.floor(value + (value * (multiplier * 10)) / 100);

export { addPercentage };
