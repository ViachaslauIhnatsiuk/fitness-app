const getPrevLocation = (location: string): string => {
  let prevLocation: string;
  let lastIndex: number;

  lastIndex = location.lastIndexOf('/');

  if (lastIndex === location.length - 1) {
    prevLocation = location.slice(0, -1);
  } else {
    prevLocation = location.slice(0, lastIndex);
  }

  lastIndex = prevLocation.lastIndexOf('/');

  if (lastIndex === location.length - 1) {
    prevLocation = location.slice(0, -1);
  } else {
    prevLocation = location.slice(0, lastIndex + 1);
  }

  return prevLocation;
};

export { getPrevLocation };
