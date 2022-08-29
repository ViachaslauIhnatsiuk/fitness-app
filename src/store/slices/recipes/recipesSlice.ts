import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_KEY, BASE_URL } from '../../constants';
import type { RecipeResponse, RecipesState, RecipesRequestConfig } from './model';
import { getMixedQueries } from '../../../helpers/getMixedQueries';
import { itemsPerPage } from '../../../components/recipes/constants';

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
        `${BASE_URL}/complexSearch?${mixedQueries}&apiKey=${API_KEY}&number=${itemsPerPage}`
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
    setQueryParams: (state, payload) => {
      state.queryParams = payload.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, { payload }: PayloadAction<RecipesState>) => {
      state.recipes = payload.recipes;
      state.isLoading = false;
      state.isUploaded = true;
      state.queryParams = payload.queryParams;
      state.error = '';
    });
    builder.addCase(
      fetchRecipes.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.isLoading = false;
        state.error = payload as string;
      }
    );
  }
});

export const { setQueryParams } = recipesSlice.actions;
export { recipesSlice };
