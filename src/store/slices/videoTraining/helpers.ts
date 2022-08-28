import { IVideo, IVideos } from '../../../models/Workout';

const getValuesFromObjectByArrayOfId = (arrayOfId: number[], object: IVideos): IVideo[] => {
  const resultedArray: IVideo[] = [];

  arrayOfId.forEach((id) => {
    if (object[id]) {
      const value = object[id];
      resultedArray.push(value);
    }
  });

  return resultedArray;
};

export { getValuesFromObjectByArrayOfId };
