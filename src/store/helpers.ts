import { IVideo, IVideos, IWorkout, IWorkouts } from '../models/Workout';

type ReturnArrayType = IVideo[] | IWorkout[];
type PossibleObjectType = IVideos | IWorkouts;
type PossibleArrayType = (IWorkout | IVideo)[];

const addZeroToDate = (date: number) => {
  const dateArray = String(date).split('');
  return dateArray.length === 1 ? `0${dateArray.join('')}` : dateArray.join('');
};

const convertDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = addZeroToDate(date.getMonth() + 1);
  const day = addZeroToDate(date.getDate());
  return `${year}-${month}-${day}`;
};

const getValuesFromObjectByArrayOfId = (
  arrayOfId: number[],
  object: PossibleObjectType
): ReturnArrayType => {
  const resultedArray: PossibleArrayType = [];

  arrayOfId.forEach((id) => {
    if (object[id]) {
      const value = object[id];
      resultedArray.push(value);
    }
  });

  return resultedArray as ReturnArrayType;
};

export { convertDateToString, getValuesFromObjectByArrayOfId };
