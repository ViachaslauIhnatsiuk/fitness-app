import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IUser } from '../models/User';
import { RootState } from './store';

interface ProfileState {
  isAuth: boolean;
  user: IUser | null;
}

interface RecipesState {
  recipes: RecipeResponse;
  isLoading: boolean;
  isUploaded: boolean;
  queryRequest: string;
  error: string;
}

interface RecipeResponse {
  results: IRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface IRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type { ProfileState, RecipesState, RecipeResponse, IRecipe };
