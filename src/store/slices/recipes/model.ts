interface IRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

type RecipesRequestConfig = {
  query: string;
  type: string;
  offset: number;
};

interface RecipeResponse {
  results: IRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface RecipesState {
  recipes: RecipeResponse;
  isLoading: boolean;
  isUploaded: boolean;
  queryParams: RecipesRequestConfig;
  error: string;
}

export type { IRecipe, RecipesRequestConfig, RecipeResponse, RecipesState };
