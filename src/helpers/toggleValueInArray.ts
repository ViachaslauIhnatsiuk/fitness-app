const toggleValueInArray = (array: number[], value: number): number[] => {
  if (array.includes(value)) {
    return array.filter((arrVal) => arrVal !== value);
  }
  array.push(value);
  return array;
};

export { toggleValueInArray };
