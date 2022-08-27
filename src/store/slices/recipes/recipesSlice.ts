import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_KEY, BASE_URL } from '../../constants';
import type { RecipeResponse, RecipesState, RecipesRequestConfig } from './model';
import { getMixedQueries } from '../../../helpers/getMixedQueries';

const initialState: RecipesState = {
  recipes: {
    results: [],
    offset: 0,
    number: 0,
    totalResults: 0
  },
  isLoading: false,
  isUploaded: false,
  queryParams: {
    query: '',
    type: '',
    offset: 0
  },
  error: ''
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (config: RecipesRequestConfig, { rejectWithValue }) => {
    try {
      const mixedQueries = getMixedQueries(config);
      const response = await fetch(
        `${BASE_URL}/complexSearch?${mixedQueries}&apiKey=${API_KEY}&number=12`
      ).catch((error: Error) => error);
      const data = (await (response as Response).json()) as RecipeResponse;
      return { recipes: data, queryParams: config } as RecipesState;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setQueryParams: (state, { payload }: PayloadAction<RecipesRequestConfig>) => {
      state.queryParams = payload;
    }
  },
  extraReducers: {
    [fetchRecipes.fulfilled.type]: (state, action) => {
      state.recipes = action.payload.recipes;
      state.isLoading = false;
      state.isUploaded = true;
      state.queryParams = action.payload.queryParams;
      state.error = '';
    },
    [fetchRecipes.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchRecipes.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { setQueryParams } = recipesSlice.actions;
export { recipesSlice };
