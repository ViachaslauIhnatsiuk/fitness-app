import { IRecipeInfoShort } from './modelRecipeById';

interface IFavorite {
  videoTrainings: number[];
  trainings: number[];
  recipes: IRecipeInfoShort[];
}

enum FavoritePath {
  videos = 'favorite/video-trainings',
  trainings = 'favorite/trainings',
  recipes = 'favorite/recipes',
  customTrainings = 'favorite/custom-trainings'
}

export { FavoritePath };
export type { IFavorite };
