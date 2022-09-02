const covertToMinutesString = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes) return `${minutes} min ${seconds} sec`;
  return `${seconds} sec`;
};

const covertToMinutesNumber = (time: number): number => {
  const minutes = Math.floor(time / 60);
  return minutes;
};

export { covertToMinutesString, covertToMinutesNumber };
