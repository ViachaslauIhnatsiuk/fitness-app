const getSecondPartPath = (path: string): string => {
  const [, secondPart] = path.slice(1).split('/');
  return secondPart;
};

export { getSecondPartPath };
