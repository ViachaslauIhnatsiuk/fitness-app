import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY, BASE_URL } from '../constants';
import type { RecipesState } from '../model';

const initialState: RecipesState = {
  recipes: {
    results: [],
    offset: 0,
    number: 0,
    totalResults: 0
  },
  isLoading: false,
  error: '',
  isUploaded: false
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/complexSearch?query=${query}&apiKey=${API_KEY}&number=12`
      ).catch((error: Error) => error);
      return (await (response as Response).json()) as RecipesState;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipes.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.recipes = action.payload;
      state.isUploaded = true;
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

export { recipesSlice };
