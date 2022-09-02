const getPath = (currentPath: string) => {
  let link = '';
  switch (currentPath) {
    case 'food/recipes':
      link = 'favorite/recipes';
      break;
    case 'workout/videos':
      link = 'favorite/video-trainings';
      break;
    case 'workout/trainings':
      link = 'favorite/trainings';
      break;
  }
  return link;
};

const getCurrentPath = (path: string) => path.slice(1).split('/').slice(0, 2).join('/');

export { getPath, getCurrentPath };
