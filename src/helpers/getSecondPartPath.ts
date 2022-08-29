const getSecondPartPath = (path: string): string => {
  const [_, secondPart] = path.slice(1).split('/');
  return secondPart;
};

export { getSecondPartPath };
