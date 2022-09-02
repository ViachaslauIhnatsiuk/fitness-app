const capitalize = (str: string): string => {
  return str.replace(/(^|\s)\S/g, (a: string) => {
    return a.toUpperCase();
  });
};

const convertTitleVideoCard = (title: string): string =>
  capitalize(
    title
      .split('_')
      .filter((char) => char !== '_')
      .join(' ')
  );

const calculateCalories = (numberOfSets: number, calories: number): number => {
  const value = numberOfSets * (calories / 3);

  const addPercentage = (multiplier: number): number =>
    Math.ceil(value - (value * (multiplier * 10)) / 100);

  if (numberOfSets <= 3) {
    return addPercentage(0);
  }

  if (numberOfSets === 4) {
    return addPercentage(2);
  }

  return addPercentage(3);
};

const calculateTime = (numberOfSets: number, numberOfReps: string): number => {
  const reps = parseInt(numberOfReps, 10);
  return numberOfSets * reps;
};

export { convertTitleVideoCard, calculateCalories, calculateTime };
