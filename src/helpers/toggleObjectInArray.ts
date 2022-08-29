import { IRecipeInfoShort } from '../models/modelRecipeById';

const toggleObjectInArray = (
  array: IRecipeInfoShort[],
  object: IRecipeInfoShort
): IRecipeInfoShort[] => {
  if (array.find((item) => item.id === object.id)) {
    return array.filter((item) => item.id !== object.id);
  }
  return [...array, object];
};

export { toggleObjectInArray };
