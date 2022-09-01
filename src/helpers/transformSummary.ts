const transformSummary = (text: string): string => {
  const arr = text.split(/<b>|<\/b>/gm);
  const lastIndex = arr.length - 1;

  const firstLink = arr[lastIndex].indexOf('<a href');
  arr[lastIndex] = arr[lastIndex].slice(0, firstLink);

  const lastDot = arr[lastIndex].lastIndexOf('.');
  arr[lastIndex] = arr[lastIndex].slice(0, lastDot + 1);

  return arr.join('');
};

export { transformSummary };
