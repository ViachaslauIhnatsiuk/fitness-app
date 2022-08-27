const capitalize = (str: string) => {
  return str.replace(/(^|\s)\S/g, (a: string) => {
    return a.toUpperCase();
  });
};

const convertTitleVideoCard = (title: string) =>
  capitalize(
    title
      .split('_')
      .filter((char) => char !== '_')
      .join(' ')
  );

export { convertTitleVideoCard };
