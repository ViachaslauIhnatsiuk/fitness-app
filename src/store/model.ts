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
  error: string;
}

interface RecipeResponse {
  from: number;
  to: number;
  count: number;
  _links: {
    self: {
      href: string;
      title: string;
    };
    next: {
      href: string;
      title: string;
    };
  };
  hits: [
    {
      recipe: Recipe;
      _links: {
        self: {
          href: string;
          title: string;
        };
        next: {
          href: string;
          title: string;
        };
      };
    }
  ];
}

interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: {
    THUMBNAIL: {
      url: string;
      width: number;
      height: number;
    };
    SMALL: {
      url: string;
      width: number;
      height: number;
    };
    REGULAR: {
      url: string;
      width: number;
      height: number;
    };
    LARGE: {
      url: string;
      width: number;
      height: number;
    };
  };
  source: string;
  url: string;
  shareAs: string;
  yield: 0;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: [
    {
      text: string;
      quantity: number;
      measure: string;
      food: string;
      weight: number;
      foodId: string;
    }
  ];
  calories: number;
  glycemicIndex: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  instructions: string[];
  tags: string[];
  externalId: string;
  totalNutrients: Record<string, unknown>;
  totalDaily: Record<string, unknown>;
  digest: [
    {
      label: string;
      tag: string;
      schemaOrgTag: string;
      total: number;
      hasRDI: true;
      daily: number;
      unit: string;
      sub: Record<string, unknown>;
    }
  ];
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type { ProfileState, RecipesState, RecipeResponse, Recipe };
